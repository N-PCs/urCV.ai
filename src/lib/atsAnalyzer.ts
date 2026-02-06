import { ResumeData } from "@/pages/Builder";

// Comprehensive list of action verbs for better scoring
const ACTION_VERBS = [
  "accelerated", "accomplished", "achieved", "acquired", "adapted", "administered", "advanced", "advised", "analyzed",
  "architected", "assessed", "attained", "augmented", "authored", "automated", "balanced", "blocked", "boosted",
  "briefed", "budged", "built", "calculated", "capitalized", "captured", "championed", "clarified", "coached",
  "collaborated", "collected", "combined", "commissioned", "communicated", "composed", "computed", "conceived",
  "conducted", "consolidated", "constructed", "consulted", "contributed", "converted", "coordinated", "counseled",
  "crafted", "created", "cultivated", "debugged", "decreased", "defined", "delegated", "delivered", "demonstrated",
  "deployed", "designed", "detected", "determined", "developed", "devised", "diagnosed", "directed", "discovered",
  "dispatched", "displayed", "distributed", "diversified", "documented", "doubled", "drafted", "drove", "earned",
  "edited", "educated", "eliminated", "enabled", "enforced", "engineered", "enhanced", "enlarged", "ensured",
  "established", "estimated", "evaluated", "examined", "executed", "expanded", "expedited", "experienced",
  "experimented", "explored", "facilitated", "filtered", "finalized", "fixed", "focused", "forecasted", "formed",
  "formulated", "fostered", "founded", "gained", "gathered", "generated", "governed", "guided", "handled",
  "headed", "hired", "identified", "illustrated", "implemented", "improved", "improvised", "increased", "indexed",
  "influenced", "initiated", "innovated", "inspected", "inspired", "installed", "instituted", "instructed",
  "integrated", "investigated", "justified", "launched", "led", "lectured", "leveraged", "licensed", "localized",
  "located", "maintained", "managed", "mapped", "marketed", "maximized", "measured", "mediated", "mentored",
  "merged", "migrated", "minimized", "modeled", "modified", "monitored", "motivation", "negotiated", "observed",
  "obtained", "operated", "optimized", "orchestrated", "organized", "originated", "outperformed", "overcame",
  "overhauled", "oversaw", "participated", "partnered", "performed", "persuaded", "pioneered", "planned",
  "predicted", "prepared", "presented", "prevented", "processed", "produced", "programmed", "promoted", "proposed",
  "proved", "provided", "published", "purchased", "quantified", "quoted", "raised", "reached", "recommended",
  "reconciled", "recorded", "recruited", "redesigned", "reduced", "refactored", "refined", "focused", "regulated",
  "reinforced", "rejuvenated", "rendered", "renewed", "reorganized", "reported", "represented", "researched",
  "resolved", "restored", "restructured", "revamped", "reviewed", "revitalized", "revived", "scheduled", "screened",
  "secured", "selected", "separated", "served", "shaped", "simplified", "simulated", "solved", "spearheaded",
  "specified", "staffed", "standardized", "started", "strengthened", "structured", "studied", "supervised",
  "supplied", "supported", "surpassed", "synthesized", "systematized", "targeted", "taught", "tested", "tracked",
  "trained", "transformed", "translated", "traveled", "trimmed", "upgraded", "utilized", "validated", "verified",
  "visualized", "won", "wrote"
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
  suggestions: string[];
}

export function analyzeATS(resume: ResumeData): ATSResult {
  let score = 0;
  const warnings: string[] = [];
  const suggestions: string[] = [];

  // ---------------------------
  // 1️⃣ STRUCTURE (25 points)
  // ---------------------------
  let structure = 0;

  if (resume.personalInfo.summary) structure += 5;
  else {
    warnings.push("Missing professional summary");
    suggestions.push("Add a 3-4 sentence professional summary covering your experience and key skills.");
  }

  if (resume.personalInfo.email && resume.personalInfo.phone) structure += 5;
  else warnings.push("Missing contact information (email or phone)");

  if (resume.experience.length > 0) structure += 5;
  else warnings.push("No experience section found");

  if (resume.education.length > 0) structure += 5;
  else warnings.push("Education section missing");

  if (resume.skills.technical.length > 0) structure += 5;
  else warnings.push("No technical skills listed");

  // Formatting check (simple consistency check)
  const hasDates = resume.experience.every(exp => exp.startDate && (exp.endDate || exp.current));
  if (!hasDates && resume.experience.length > 0) {
    warnings.push("Some experience entries are missing dates");
    suggestions.push("Ensure all work experience entries have valid start and end dates (or 'Present').");
    structure = Math.max(0, structure - 5);
  }

  score += structure;

  // ---------------------------
  // 2️⃣ KEYWORDS (25 points)
  // ---------------------------
  let keywords = 0;

  // Create a corpus of text from the resume
  const experienceText = resume.experience
    .map(e => `${e.title} ${e.description}`)
    .join(" ")
    .toLowerCase();
  
  const summaryText = (resume.personalInfo.summary || "").toLowerCase();
  const fullText = `${experienceText} ${summaryText}`;

  // Check if technical skills appear in experience or summary context
  let skillsUsedCount = 0;
  const totalSkills = resume.skills.technical.length;

  if (totalSkills > 0) {
    resume.skills.technical.forEach(skill => {
      // Simple exact match first
      if (fullText.includes(skill.toLowerCase())) {
        skillsUsedCount++;
      }
    });

    const usageRatio = skillsUsedCount / totalSkills;
    if (usageRatio > 0.5) keywords += 25;
    else if (usageRatio > 0.3) keywords += 15;
    else keywords += 5;

    if (usageRatio < 0.3) {
      warnings.push("Skills are not well-reflected in your experience or summary");
      suggestions.push("Weave your technical skills (e.g., " + resume.skills.technical.slice(0, 3).join(", ") + ") into your bullet points.");
    }
  } else {
    // No skills to check against
    keywords = 0;
  }

  score += keywords;

  // ---------------------------
  // 3️⃣ CONTENT & IMPACT (25 points)
  // ---------------------------
  let bullets = 0;
  let strongBulletsCount = 0;
  let totalBullets = 0;

  resume.experience.forEach(exp => {
    // Split description into lines/sentences assuming they act as bullets
    const lines = exp.description.split(/\n|\. /).filter(l => l.trim().length > 10);
    totalBullets += lines.length;

    lines.forEach(line => {
      const lowerLine = line.toLowerCase().trim();
      const startsWithActionVerb = ACTION_VERBS.some(verb => lowerLine.startsWith(verb) || lowerLine.startsWith(verb + "ed") || lowerLine.startsWith(verb + "d"));
      
      const hasMetrics = /\d+%|\d+\+|\d+ users|\$\d+|\d+ clients|\d+x/.test(lowerLine);
      
      if (startsWithActionVerb) strongBulletsCount += 0.5;
      if (hasMetrics) strongBulletsCount += 0.5;
    });
  });

  if (totalBullets > 0) {
    const qualityRatio = strongBulletsCount / totalBullets;
    if (qualityRatio > 0.6) bullets = 25;
    else if (qualityRatio > 0.4) bullets = 15;
    else bullets = 5;

    if (qualityRatio < 0.4) {
      warnings.push("Experience descriptions lack strong action verbs or metrics");
      suggestions.push("Start every bullet point with a strong action verb (e.g., 'Architected', 'Reduced', 'Led').");
      suggestions.push("Quantify your impact using numbers (e.g., 'Increased efficiency by 20%').");
    }
  }

  score += bullets;

  // ---------------------------
  // 4️⃣ BREVITY & READABILITY (25 points)
  // ---------------------------
  let readability = 25;

  // Summary length check
  const summaryLength = (resume.personalInfo.summary || "").split(" ").length;
  if (summaryLength > 0) {
    if (summaryLength < 20) {
      readability -= 5;
      warnings.push("Summary is too short");
    } else if (summaryLength > 100) {
      readability -= 5;
      warnings.push("Summary is too long");
      suggestions.push("Keep your professional summary concise (30-60 words).");
    }
  }

  // Bullet length check
  let longBullets = 0;
  resume.experience.forEach(exp => {
    const lines = exp.description.split(/\n/);
    lines.forEach(line => {
      if (line.split(" ").length > 30) longBullets++;
    });
  });

  if (longBullets > 2) {
    readability -= 10;
    warnings.push("Some bullet points are too wordy");
    suggestions.push("Split long bullet points into multiple concise statements.");
  }

  score += Math.max(0, readability);

  return {
    score: Math.min(score, 100),
    breakdown: {
      structure,
      keywords,
      bullets: Math.round(bullets), // Ensure integer
      readability: Math.max(0, readability),
    },
    warnings,
    suggestions,
  };
}
