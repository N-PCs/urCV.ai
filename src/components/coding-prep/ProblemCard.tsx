import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, ChevronUp, ChevronDown, Zap, Clock, Layers } from "lucide-react";
import { CodingProblem } from "@/lib/codingContent";
import { difficultyColors, categoryColors } from "./constants";
import CodeBlock from "./CodeBlock";

interface ProblemCardProps {
    problem: CodingProblem;
    isExpanded: boolean;
    isCompleted: boolean;
    selectedLanguage: string;
    onToggleExpand: (id: string) => void;
    onToggleComplete: (id: string) => void;
    onSelectLanguage: (language: string) => void;
}

const ProblemCard: React.FC<ProblemCardProps> = ({
    problem,
    isExpanded,
    isCompleted,
    selectedLanguage,
    onToggleExpand,
    onToggleComplete,
    onSelectLanguage,
}) => {
    const solution =
        problem.solutions.find((s) => s.language === selectedLanguage) ||
        problem.solutions[0];

    return (
        <Card
            className={`overflow-hidden transition-all duration-300 border-gray-200 dark:border-gray-700 ${isCompleted
                    ? "border-green-300 dark:border-green-700 bg-green-50/50 dark:bg-green-900/10"
                    : ""
                }`}
        >
            <div
                className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                onClick={() => onToggleExpand(problem.id)}
            >
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleComplete(problem.id);
                                }}
                                className="transition-transform hover:scale-110"
                            >
                                {isCompleted ? (
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                ) : (
                                    <Circle className="w-5 h-5 text-gray-400 hover:text-green-500" />
                                )}
                            </button>
                            <Badge
                                className={
                                    categoryColors[problem.category as keyof typeof categoryColors] ||
                                    "bg-gray-100"
                                }
                            >
                                {problem.category}
                            </Badge>
                            <Badge
                                variant="outline"
                                className={difficultyColors[problem.difficulty]}
                            >
                                {problem.difficulty}
                            </Badge>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {problem.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                            {problem.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3">
                            {problem.topics.map((topic) => (
                                <span
                                    key={topic}
                                    className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
                                >
                                    {topic}
                                </span>
                            ))}
                        </div>
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
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-6">
                        {/* Constraints */}
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                Constraints
                            </h4>
                            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                {problem.constraints.map((c, i) => (
                                    <li key={i}>{c}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Examples */}
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                Examples
                            </h4>
                            <div className="space-y-3">
                                {problem.examples.map((ex, i) => (
                                    <div
                                        key={i}
                                        className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg text-sm"
                                    >
                                        <div className="font-mono">
                                            <span className="text-gray-500">Input:</span> {ex.input}
                                        </div>
                                        <div className="font-mono">
                                            <span className="text-gray-500">Output:</span> {ex.output}
                                        </div>
                                        {ex.explanation && (
                                            <div className="text-gray-600 dark:text-gray-400 mt-1">
                                                <span className="text-gray-500">Explanation:</span>{" "}
                                                {ex.explanation}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Approach */}
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                                <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                                Approach
                            </h4>
                            <p className="text-gray-700 dark:text-gray-300 text-sm">
                                {problem.approach}
                            </p>
                        </div>

                        {/* Solution */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="font-semibold text-gray-900 dark:text-white">
                                    Solution
                                </h4>
                                <div className="flex gap-2">
                                    {problem.solutions.map((sol) => (
                                        <Button
                                            key={sol.language}
                                            variant={
                                                selectedLanguage === sol.language ? "default" : "outline"
                                            }
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onSelectLanguage(sol.language);
                                            }}
                                        >
                                            {sol.language}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            <CodeBlock code={solution.code} language={solution.language} />
                        </div>

                        {/* Complexity */}
                        <div className="flex gap-6">
                            <div className="flex items-center text-sm">
                                <Clock className="w-4 h-4 mr-2 text-blue-500" />
                                <span className="text-gray-600 dark:text-gray-400">Time: </span>
                                <span className="ml-1 font-mono text-gray-900 dark:text-white">
                                    {problem.timeComplexity}
                                </span>
                            </div>
                            <div className="flex items-center text-sm">
                                <Layers className="w-4 h-4 mr-2 text-purple-500" />
                                <span className="text-gray-600 dark:text-gray-400">Space: </span>
                                <span className="ml-1 font-mono text-gray-900 dark:text-white">
                                    {problem.spaceComplexity}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default ProblemCard;
