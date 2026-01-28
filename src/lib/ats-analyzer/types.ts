export interface SectionScore {
    score: number;
    maxScore: number;
    label: string;
}

export interface ATSAnalysisResult {
    totalScore: number;
    sectionScores: {
        keywords: SectionScore;
        experience: SectionScore;
        education: SectionScore;
        formatting: SectionScore;
        bestPractices: SectionScore;
    };
    warnings: string[];
    suggestions: string[];
}
