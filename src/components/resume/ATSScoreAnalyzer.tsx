import React, { useMemo } from 'react';
import { analyzeATS } from '@/lib/ats-analyzer';
import { ResumeData } from '@/pages/Builder';
import { Progress } from '@/components/ui/progress';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    CheckCircle2,
    Lightbulb,
    AlertTriangle,
    Target,
    Briefcase,
    GraduationCap,
    Layout,
    Award,
    Info,
    PartyPopper
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SectionScore } from '@/lib/ats-analyzer/types';

interface ATSScoreAnalyzerProps {
    data: ResumeData;
}

const ATSScoreAnalyzer: React.FC<ATSScoreAnalyzerProps> = ({ data }) => {
    const result = useMemo(() => analyzeATS(data), [data]);

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-500 stroke-green-500';
        if (score >= 60) return 'text-yellow-500 stroke-yellow-500';
        return 'text-red-500 stroke-red-500';
    };

    const getSectionIcon = (label: string) => {
        switch (label) {
            case 'Keywords & Skills': return <Target className="w-4 h-4" />;
            case 'Experience': return <Briefcase className="w-4 h-4" />;
            case 'Education': return <GraduationCap className="w-4 h-4" />;
            case 'Formatting': return <Layout className="w-4 h-4" />;
            case 'Best Practices': return <Award className="w-4 h-4" />;
            default: return <Info className="w-4 h-4" />;
        }
    };

    return (
        <div className="space-y-6 animate-fade-in p-1">
            {/* Header with Total Score */}
            <div className="grid md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-1 flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="64"
                                cy="64"
                                r="58"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                className="text-gray-100 dark:text-gray-800"
                            />
                            <circle
                                cx="64"
                                cy="64"
                                r="58"
                                stroke="currentColor"
                                strokeWidth="8"
                                fill="transparent"
                                strokeDasharray="364.42"
                                strokeDashoffset={(364.42 - (364.42 * result.totalScore) / 100).toString()}
                                strokeLinecap="round"
                                className={cn("transition-all duration-1000 ease-out", getScoreColor(result.totalScore).split(' ')[1])}
                            />
                        </svg>
                        <span className={cn("absolute text-3xl font-bold", getScoreColor(result.totalScore).split(' ')[0])}>
                            {result.totalScore}
                        </span>
                    </div>
                    <h3 className="mt-4 font-semibold text-gray-900 dark:text-white">ATS Score</h3>
                    <p className="text-[10px] text-center text-gray-500 mt-1 uppercase tracking-wider font-medium">Recruiter Readiness</p>
                </div>

                <div className="md:col-span-2 space-y-4">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Data Quality Breakdown</h4>
                        <Badge variant="outline" className="text-[9px] uppercase tracking-tighter bg-gray-50 dark:bg-gray-800/50">Rule-Based Engine</Badge>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {(Object.values(result.sectionScores) as SectionScore[]).map((section) => (
                            <div key={section.label} className="space-y-1.5">
                                <div className="flex justify-between text-[11px] font-medium uppercase tracking-tight text-gray-500">
                                    <span className="flex items-center gap-2">
                                        {getSectionIcon(section.label)}
                                        {section.label}
                                    </span>
                                    <span>{section.score} / {section.maxScore}</span>
                                </div>
                                <Progress value={(section.score / section.maxScore) * 100} className="h-1.5" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Critical Warnings */}
                <Card className="border-red-100 dark:border-red-900/30 shadow-none bg-red-50/20 dark:bg-transparent">
                    <CardHeader className="pb-3 pt-4">
                        <CardTitle className="text-sm font-bold flex items-center gap-2 text-red-700 dark:text-red-400">
                            <AlertTriangle className="w-4 h-4" />
                            Critical Issues
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-4">
                        {result.warnings.length > 0 ? (
                            <ul className="space-y-3">
                                {result.warnings.map((warning, idx) => (
                                    <li key={idx} className="flex gap-3 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                                        <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-500" />
                                        {warning}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-4 text-center">
                                <CheckCircle2 className="w-8 h-8 text-green-500 mb-2 opacity-80" />
                                <p className="text-xs font-bold text-green-700 dark:text-green-400">Perfect Structure!</p>
                                <p className="text-[10px] text-gray-500 mt-1">No major formatting issues detected.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Improvement Suggestions */}
                <Card className="border-blue-100 dark:border-blue-900/30 shadow-none bg-blue-50/20 dark:bg-transparent">
                    <CardHeader className="pb-3 pt-4">
                        <CardTitle className="text-sm font-bold flex items-center gap-2 text-blue-700 dark:text-blue-400">
                            <Lightbulb className="w-4 h-4" />
                            Optimization Wins
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-4">
                        {result.suggestions.length > 0 ? (
                            <ul className="space-y-3">
                                {result.suggestions.map((suggestion, idx) => (
                                    <li key={idx} className="flex gap-3 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                                        <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-500" />
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-4 text-center">
                                <PartyPopper className="w-8 h-8 text-blue-500 mb-2 opacity-80" />
                                <p className="text-xs font-bold text-blue-700 dark:text-blue-400">Recruiter-Ready!</p>
                                <p className="text-[10px] text-gray-500 mt-1">Your content follows industry best practices.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <Card className="p-4 bg-gray-50 dark:bg-gray-800/30 border-none shadow-none">
                <div className="flex gap-3 items-start">
                    <Info className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <p className="text-[10px] text-gray-500 leading-relaxed italic">
                        <strong>Analyzer Note:</strong> This score is calculated locally based on standard recruitment patterns. It focuses on structure, quantifiable impact, and keyword density. While not a guarantee of employment, it significantly increases your chances of passing initial ATS filters.
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default ATSScoreAnalyzer;
