import { ResumeData } from '@/pages/Builder';
import { ACTION_VERBS, SECTION_WEIGHTS, MIN_SUMMARY_LENGTH, IDEAL_SKILLS_COUNT, IDEAL_BULLETS_PER_EXP } from './constants';
import { ATSAnalysisResult } from './types';

/**
 * Analyzes resume data based on recruiter-aligned ATS rules.
 * This is a deterministic, rule-based scoring engine.
 */
export function analyzeATS(data: ResumeData): ATSAnalysisResult {
    const warnings: string[] = [];
    const suggestions: string[] = [];

    // --- 1. Keywords & Skills (30%) ---
    let rawKeywordsScore = 0;
    const techSkills = data?.skills?.technical ?? [];
    const languages = data?.skills?.languages ?? [];
    const certifications = data?.skills?.certifications ?? [];

    if (techSkills.length === 0) {
        warnings.push('Skills section is empty. ATS systems prioritize skill keywords.');
    } else {
        rawKeywordsScore += Math.min(20, techSkills.length * 2.5);
        if (techSkills.length < IDEAL_SKILLS_COUNT) {
            suggestions.push(`Consider adding more technical skills (ideally ${IDEAL_SKILLS_COUNT}+) for better keyword coverage.`);
        }
    }

    if (languages.length > 0) rawKeywordsScore += 5;
    if (certifications.length > 0) rawKeywordsScore += 5;

    const keywordsScore = Math.min(rawKeywordsScore, SECTION_WEIGHTS.keywords);

    // --- 2. Experience (25%) ---
    let rawExperienceScore = 0;
    const experiences = data?.experience ?? [];

    if (experiences.length === 0) {
        warnings.push('Work experience is missing. This is the most critical section for recruiters.');
    } else {
        rawExperienceScore += 5; // Base points for presence

        let totalBullets = 0;
        let actionVerbCount = 0;
        let metricsCount = 0;

        experiences.forEach(exp => {
            const bulletContent = exp.description || '';
            const bullets = bulletContent.split('\n').filter(line => line.trim().length > 0);
            totalBullets += bullets.length;

            bullets.forEach(bullet => {
                // Detect action verbs using boundary-safe regex
                const hasActionVerb = ACTION_VERBS.some(verb =>
                    new RegExp(`\\b${verb}\\b`, 'i').test(bullet)
                );
                if (hasActionVerb) actionVerbCount++;

                // Detect metrics: Currency, %, or digits
                if (/[\%\$]|\b\d+\b/.test(bullet)) metricsCount++;
            });
        });

        const experienceCount = experiences.length;
        const avgBullets = experienceCount > 0 ? totalBullets / experienceCount : 0;

        rawExperienceScore += Math.min(5, avgBullets >= IDEAL_BULLETS_PER_EXP ? 5 : (avgBullets / IDEAL_BULLETS_PER_EXP) * 5);

        if (actionVerbCount > 0) rawExperienceScore += 7;
        else suggestions.push('Start your bullet points with strong action verbs (e.g., Led, Developed, Optimized).');

        if (metricsCount > 0) rawExperienceScore += 8;
        else suggestions.push('Use quantifiable metrics (%, $, numbers) to demonstrate measurable impact.');
    }

    const experienceScore = Math.min(rawExperienceScore, SECTION_WEIGHTS.experience);

    // --- 3. Education (15%) ---
    let rawEducationScore = 0;
    const education = data?.education ?? [];
    if (education.length === 0) {
        warnings.push('Education section is missing or incomplete.');
    } else {
        education.forEach(edu => {
            let eduPoints = 0;
            if (edu.degree?.trim()) eduPoints += 5;
            if (edu.school?.trim()) eduPoints += 5;
            if (edu.graduationDate?.trim()) eduPoints += 5;
            rawEducationScore = Math.max(rawEducationScore, eduPoints);
        });
    }
    const educationScore = Math.min(rawEducationScore, SECTION_WEIGHTS.education);

    // --- 4. Formatting & Structure (15%) ---
    let rawFormattingScore = 0;
    const summary = data?.personalInfo?.summary || '';
    const pInfo = data?.personalInfo;

    if (summary.trim().length >= MIN_SUMMARY_LENGTH) rawFormattingScore += 5;
    else warnings.push('Professional summary is too short or missing.');

    if (pInfo?.email && pInfo?.phone && pInfo?.location) rawFormattingScore += 5;
    else warnings.push('Missing critical contact information (email, phone, or location).');

    const links = [pInfo?.linkedin, data?.codingProfiles?.github, data?.codingProfiles?.leetcode];
    if (links.some(link => link && link.trim().length > 0)) rawFormattingScore += 5;
    else suggestions.push('Add a LinkedIn or GitHub profile to increase professional credibility.');

    const formattingScore = Math.min(rawFormattingScore, SECTION_WEIGHTS.formatting);

    // --- 5. Best Practices (15%) ---
    let rawBestPracticesScore = 0;

    // Current job presence check with safe string comparison
    const hasCurrentRole = experiences.some(exp =>
        exp.current === true ||
        (exp.endDate && (exp.endDate.toLowerCase() === 'present' || exp.endDate.toLowerCase() === 'current'))
    );
    if (hasCurrentRole) rawBestPracticesScore += 5;
    else if (experiences.length > 0) suggestions.push('Mark your current role as "Present" to show ongoing work.');

    // Summary impact
    if (summary.length > 150) rawBestPracticesScore += 5;

    // Structural sanity check
    if (experiences.length > 0 && education.length > 0 && techSkills.length > 0) rawBestPracticesScore += 5;

    const bestPracticesScore = Math.min(rawBestPracticesScore, SECTION_WEIGHTS.bestPractices);

    // Final Score Calculation with hard cap at 100
    const accumulatedScore = keywordsScore + experienceScore + educationScore + formattingScore + bestPracticesScore;
    const totalScore = Math.min(100, Math.max(0, Math.round(accumulatedScore)));

    return {
        totalScore,
        sectionScores: {
            keywords: { score: keywordsScore, maxScore: SECTION_WEIGHTS.keywords, label: 'Keywords & Skills' },
            experience: { score: experienceScore, maxScore: SECTION_WEIGHTS.experience, label: 'Experience' },
            education: { score: educationScore, maxScore: SECTION_WEIGHTS.education, label: 'Education' },
            formatting: { score: formattingScore, maxScore: SECTION_WEIGHTS.formatting, label: 'Formatting' },
            bestPractices: { score: bestPracticesScore, maxScore: SECTION_WEIGHTS.bestPractices, label: 'Best Practices' }
        },
        warnings,
        suggestions
    };
}
