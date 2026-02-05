import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronUp, ChevronDown } from "lucide-react";
import { CodingPattern, codingProblems } from "@/lib/codingContent";
import CodeBlock from "./CodeBlock";

interface PatternCardProps {
    pattern: CodingPattern;
    isExpanded: boolean;
    onToggleExpand: (id: string) => void;
}

const PatternCard: React.FC<PatternCardProps> = ({
    pattern,
    isExpanded,
    onToggleExpand,
}) => {
    return (
        <Card className="overflow-hidden transition-all duration-300 border-gray-200 dark:border-gray-700">
            <div
                className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                onClick={() => onToggleExpand(pattern.id)}
            >
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {pattern.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {pattern.description}
                        </p>
                    </div>
                    <Button variant="ghost" size="sm">
                        {isExpanded ? (
                            <ChevronUp className="w-5 h-5" />
                        ) : (
                            <ChevronDown className="w-5 h-5" />
                        )}
                    </Button>
                </div>

                {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                When to Use
                            </h4>
                            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                {pattern.whenToUse.map((use, i) => (
                                    <li key={i}>{use}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                Template
                            </h4>
                            <CodeBlock
                                code={pattern.codeTemplate.code}
                                language={pattern.codeTemplate.language}
                            />
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                Related Problems
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {pattern.problems.map((problemId) => {
                                    const problem = codingProblems.find((p) => p.id === problemId);
                                    return problem ? (
                                        <Badge
                                            key={problemId}
                                            variant="outline"
                                            className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                                        >
                                            {problem.title}
                                        </Badge>
                                    ) : null;
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default PatternCard;
