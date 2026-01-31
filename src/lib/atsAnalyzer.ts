import { ResumeData } from "@/pages/Builder";

// simple helpers
const ACTION_VERBS = [
  "built", "developed", "led", "designed", "implemented",
  "optimized", "improved", "created", "managed", "automated"
];

export interface ATSResult {
  score: number;
  breakdown: {
    structure: number;
    keywords: number;
    bullets: number;
    readability: number;
  };
  warnings: string[];
}

export function analyzeATS(resume: ResumeData): ATSResult {
  let score = 0;
  const warnings: string[] = [];

  // ---------------------------
  // 1️⃣ STRUCTURE (30)
  // ---------------------------
  let structure = 0;

  if (resume.personalInfo.summary) structure += 8;
  else warnings.push("Missing professional summary");

  if (resume.experience.length > 0) structure += 8;
  else warnings.push("No experience section found");

  if (resume.education.length > 0) structure += 6;
  else warnings.push("Education section missing");

  if (resume.skills.technical.length > 0) structure += 8;
  else warnings.push("No technical skills listed");

  structure = Math.min(structure, 30);
  score += structure;

  // ---------------------------
  // 2️⃣ KEYWORDS & SKILLS (30)
  // ---------------------------
  let keywords = 0;

  const experienceText = resume.experience
    .map(e => e.description.toLowerCase())
    .join(" ");

  resume.skills.technical.forEach(skill => {
    if (experienceText.includes(skill.toLowerCase())) {
      keywords += 2;
    }
  });

  if (keywords < 10) {
    warnings.push("Skills are not reflected clearly in experience");
  }

  keywords = Math.min(keywords, 30);
  score += keywords;

  // ---------------------------
  // 3️⃣ BULLET QUALITY (20)
  // ---------------------------
  let bullets = 0;
  let hasMetrics = false;

  resume.experience.forEach(exp => {
    const text = exp.description.toLowerCase();

    ACTION_VERBS.forEach(verb => {
      if (text.startsWith(verb)) bullets += 2;
    });

    if (/\d+%|\d+\+|\d+ users|\d+ clients/.test(text)) {
      hasMetrics = true;
      bullets += 5;
    }
  });

  if (!hasMetrics) {
    warnings.push("Add measurable impact (numbers, %, scale) in experience");
  }

  bullets = Math.min(bullets, 20);
  score += bullets;

  // ---------------------------
  // 4️⃣ READABILITY (20)
  // ---------------------------
  let readability = 20;

  const summaryLength = resume.personalInfo.summary.split(" ").length;
  if (summaryLength < 30 || summaryLength > 90) {
    readability -= 8;
    warnings.push("Professional summary length should be 40–80 words");
  }

  score += readability;

  return {
    score: Math.min(score, 100),
    breakdown: {
      structure,
      keywords,
      bullets,
      readability,
    },
    warnings,
  };
}
