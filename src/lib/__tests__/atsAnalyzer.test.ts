import { describe, it, expect } from 'vitest';
import { analyzeATS } from '../atsAnalyzer';
import { ResumeData } from '@/types/resume';

const mockResume: ResumeData = {
    personalInfo: {
        fullName: "John Doe",
        email: "john@example.com",
        phone: "1234567890",
        location: "New York, NY",
        linkedin: "linkedin.com/in/johndoe",
        portfolio: "johndoe.com",
        summary: "Architected and implemented scalable web applications using React and Node.js. Optimized database queries and improved performance by 40%. Led a team of 5 developers.",
        photoUrl: ""
    },
    experience: [
        {
            id: "1",
            title: "Senior Developer",
            company: "Tech Corp",
            location: "New York, NY",
            startDate: "2020-01",
            endDate: "Present",
            current: true,
            description: "Architected and implemented scalable web applications using React and Node.js. Optimized database queries and improved performance by 40%. Led a team of 5 developers."
        }
    ],
    education: [
        {
            id: "2",
            degree: "BS Computer Science",
            school: "University X",
            location: "New York, NY",
            graduationDate: "2019"
        }
    ],
    skills: {
        technical: ["React", "Node.js", "TypeScript", "PostgreSQL"],
        languages: ["English"],
        certifications: ["AWS Certified"]
    },
    codingProfiles: {
        github: "github.com/johndoe"
    }
};

describe('atsAnalyzer', () => {
    it('should return a perfect score for a complete resume', () => {
        const result = analyzeATS(mockResume);
        expect(result.score).toBeGreaterThanOrEqual(90);
        expect(result.warnings).toHaveLength(0);
    });

    it('should identify missing summary', () => {
        const incompleteResume = {
            ...mockResume,
            personalInfo: { ...mockResume.personalInfo, summary: "" }
        };
        const result = analyzeATS(incompleteResume);
        expect(result.warnings).toContain("Missing professional summary");
    });

    it('should identify missing skills', () => {
        const noSkillsResume = {
            ...mockResume,
            skills: { technical: [], languages: [], certifications: [] }
        };
        const result = analyzeATS(noSkillsResume);
        expect(result.warnings).toContain("No technical skills listed");
    });

    it('should identify lack of metrics in experience', () => {
        const weakResume = {
            ...mockResume,
            experience: [
                {
                    ...mockResume.experience[0],
                    description: "Worked on some tasks. Helped the team."
                }
            ]
        };
        const result = analyzeATS(weakResume);
        expect(result.warnings).toContain("Experience descriptions lack strong action verbs or metrics");
    });

    it('should identify long summary', () => {
        const longSummary = "a ".repeat(101);
        const result = analyzeATS({
            ...mockResume,
            personalInfo: { ...mockResume.personalInfo, summary: longSummary }
        });
        expect(result.warnings).toContain("Summary is too long");
    });

    it('should identify wordy bullet points', () => {
        const wordyBullet = "word ".repeat(31);
        const result = analyzeATS({
            ...mockResume,
            experience: [
                {
                    ...mockResume.experience[0],
                    description: wordyBullet + "\n" + wordyBullet + "\n" + wordyBullet
                }
            ]
        });
        expect(result.warnings).toContain("Some bullet points are too wordy");
    });

    it('should identify missing dates in experience and adjust structure score', () => {
        const noDatesResume = {
            ...mockResume,
            experience: [
                { ...mockResume.experience[0], startDate: "" }
            ]
        };
        const result = analyzeATS(noDatesResume);
        expect(result.warnings).toContain("Some experience entries are missing dates");
    });

    it('should handle low skill usage ratio', () => {
        const lowSkillResume = {
            ...mockResume,
            skills: { ...mockResume.skills, technical: ["React", "SkillX", "SkillY", "SkillZ"] },
            experience: [
                { ...mockResume.experience[0], description: "Used React." }
            ]
        };
        const result = analyzeATS(lowSkillResume);
        expect(result.warnings).toContain("Skills are not well-reflected in your experience or summary");
    });

    it('should identify missing experience and education', () => {
        const minimalResume = {
            ...mockResume,
            experience: [],
            education: []
        };
        const result = analyzeATS(minimalResume as any);
        expect(result.warnings).toContain("No experience section found");
        expect(result.warnings).toContain("Education section missing");
    });

    it('should identify missing contact info', () => {
        const noContactResume = {
            ...mockResume,
            personalInfo: { ...mockResume.personalInfo, email: "", phone: "" }
        };
        const result = analyzeATS(noContactResume);
        expect(result.warnings).toContain("Missing contact information (email or phone)");
    });
});
