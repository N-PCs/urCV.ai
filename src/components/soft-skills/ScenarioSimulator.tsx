import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    ArrowLeft,
    ChevronRight,
    CheckCircle,
    XCircle,
    Trophy,
    RotateCcw,
    Sparkles,
} from "lucide-react";
import {
    type Scenario,
    type ScenarioBranch,
    skillCategories,
} from "@/lib/softSkillsContent";

// Color mapping
const categoryColorClasses: Record<string, { bg: string; text: string; border: string }> = {
    blue: { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", border: "border-blue-200 dark:border-blue-800" },
    purple: { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-400", border: "border-purple-200 dark:border-purple-800" },
    yellow: { bg: "bg-yellow-100 dark:bg-yellow-900/30", text: "text-yellow-700 dark:text-yellow-400", border: "border-yellow-200 dark:border-yellow-800" },
    green: { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-700 dark:text-green-400", border: "border-green-200 dark:border-green-800" },
    pink: { bg: "bg-pink-100 dark:bg-pink-900/30", text: "text-pink-700 dark:text-pink-400", border: "border-pink-200 dark:border-pink-800" },
    indigo: { bg: "bg-indigo-100 dark:bg-indigo-900/30", text: "text-indigo-700 dark:text-indigo-400", border: "border-indigo-200 dark:border-indigo-800" },
};

interface ScenarioSimulatorProps {
    scenario: Scenario;
    onComplete: (xpEarned: number, optimalPath: boolean) => void;
    onExit: () => void;
}

const ScenarioSimulator = ({ scenario, onComplete, onExit }: ScenarioSimulatorProps) => {
    const [currentBranchIndex, setCurrentBranchIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<{ branchId: string; optionId: string; xpEarned: number; isOptimal: boolean }[]>([]);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const category = skillCategories.find((c) => c.id === scenario.category)!;
    const colors = categoryColorClasses[category.color];
    const currentBranch = scenario.branches[currentBranchIndex];

    const handleOptionSelect = (optionId: string) => {
        const option = currentBranch.options.find((o) => o.id === optionId)!;

        setSelectedOptions([
            ...selectedOptions,
            {
                branchId: currentBranch.id,
                optionId,
                xpEarned: option.xpReward,
                isOptimal: option.isOptimal,
            },
        ]);
        setShowFeedback(true);
    };

    const handleContinue = () => {
        const lastOption = selectedOptions[selectedOptions.length - 1];
        const option = currentBranch.options.find((o) => o.id === lastOption.optionId)!;

        if (option.nextBranchId) {
            const nextIndex = scenario.branches.findIndex((b) => b.id === option.nextBranchId);
            if (nextIndex !== -1) {
                setCurrentBranchIndex(nextIndex);
                setShowFeedback(false);
            } else {
                finishScenario();
            }
        } else {
            finishScenario();
        }
    };

    const finishScenario = () => {
        setIsComplete(true);
    };

    const handleComplete = () => {
        const totalXP = selectedOptions.reduce((sum, opt) => sum + opt.xpEarned, 0);
        const allOptimal = selectedOptions.every((opt) => opt.isOptimal);
        onComplete(totalXP, allOptimal);
    };

    const handleRestart = () => {
        setCurrentBranchIndex(0);
        setSelectedOptions([]);
        setShowFeedback(false);
        setIsComplete(false);
    };

    const totalXPEarned = selectedOptions.reduce((sum, opt) => sum + opt.xpEarned, 0);
    const allOptimal = selectedOptions.every((opt) => opt.isOptimal);
    const progress = ((currentBranchIndex + 1) / scenario.branches.length) * 100;

    // Completion screen
    if (isComplete) {
        return (
            <div className="max-w-2xl mx-auto">
                <Card className="p-8 text-center">
                    <div className={`w-24 h-24 rounded-full ${colors.bg} flex items-center justify-center mx-auto mb-6`}>
                        <Trophy className={`w-12 h-12 ${colors.text}`} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Scenario Complete!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {scenario.title}
                    </p>

                    {/* XP Summary */}
                    <div className={`inline-flex items-center gap-2 px-6 py-4 rounded-lg ${colors.bg} mb-6`}>
                        <Sparkles className={`w-6 h-6 ${colors.text}`} />
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">+{totalXPEarned} XP</span>
                    </div>

                    {/* Performance */}
                    <div className="mb-6">
                        {allOptimal ? (
                            <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
                                <CheckCircle className="w-5 h-5" />
                                <span className="font-medium">Perfect Path! You made all optimal choices.</span>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center gap-2 text-yellow-600 dark:text-yellow-400">
                                <span className="font-medium">Good effort! Try again for a perfect score.</span>
                            </div>
                        )}
                    </div>

                    {/* Decision Review */}
                    <div className="text-left mb-8">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Your Decisions:</h3>
                        <div className="space-y-2">
                            {selectedOptions.map((opt, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center justify-between p-3 rounded-lg ${opt.isOptimal
                                            ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                                            : "bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800"
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        {opt.isOptimal ? (
                                            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                                        ) : (
                                            <XCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                                        )}
                                        <span className="text-sm text-gray-700 dark:text-gray-300">Decision {index + 1}</span>
                                    </div>
                                    <Badge variant="outline" className={opt.isOptimal ? "border-green-300" : "border-yellow-300"}>
                                        +{opt.xpEarned} XP
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <Button variant="outline" onClick={handleRestart}>
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Try Again
                        </Button>
                        <Button onClick={handleComplete}>
                            Complete & Earn XP
                            <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <Button variant="ghost" onClick={onExit}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Exit Scenario
                </Button>
                <Badge className={`${colors.bg} ${colors.text}`}>{category.name}</Badge>
            </div>

            {/* Progress */}
            <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <span>Decision {currentBranchIndex + 1} of {scenario.branches.length}</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
            </div>

            {/* Scenario Context (first branch only) */}
            {currentBranchIndex === 0 && (
                <Card className={`p-6 mb-6 ${colors.bg} border ${colors.border}`}>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{scenario.title}</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{scenario.context}</p>
                    <div className="bg-white/60 dark:bg-gray-900/60 p-4 rounded-lg">
                        <p className="text-gray-800 dark:text-gray-200 italic">"{scenario.initialSituation}"</p>
                    </div>
                </Card>
            )}

            {/* Current Branch */}
            <Card className="p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    {currentBranch.prompt}
                </h3>

                <div className="space-y-3">
                    {currentBranch.options.map((option) => {
                        const isSelected = selectedOptions.some(
                            (so) => so.branchId === currentBranch.id && so.optionId === option.id
                        );

                        return (
                            <button
                                key={option.id}
                                onClick={() => !showFeedback && handleOptionSelect(option.id)}
                                disabled={showFeedback}
                                className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${showFeedback && isSelected
                                        ? option.isOptimal
                                            ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                                            : "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
                                        : showFeedback
                                            ? "border-gray-200 dark:border-gray-700 opacity-50"
                                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900/50"
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div
                                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${showFeedback && isSelected
                                                ? option.isOptimal
                                                    ? "border-green-500 bg-green-100 dark:bg-green-900/50"
                                                    : "border-yellow-500 bg-yellow-100 dark:bg-yellow-900/50"
                                                : "border-gray-300 dark:border-gray-600"
                                            }`}
                                    >
                                        {showFeedback && isSelected && (
                                            option.isOptimal ? (
                                                <CheckCircle className="w-4 h-4 text-green-600" />
                                            ) : (
                                                <XCircle className="w-4 h-4 text-yellow-600" />
                                            )
                                        )}
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-300">{option.text}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Feedback */}
                {showFeedback && (
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className={`p-4 rounded-lg ${selectedOptions[selectedOptions.length - 1]?.isOptimal
                                ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                                : "bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800"
                            }`}>
                            <div className="flex items-center gap-2 mb-2">
                                {selectedOptions[selectedOptions.length - 1]?.isOptimal ? (
                                    <>
                                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                                        <span className="font-semibold text-green-800 dark:text-green-300">Optimal Choice!</span>
                                    </>
                                ) : (
                                    <>
                                        <XCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                                        <span className="font-semibold text-yellow-800 dark:text-yellow-300">Good Try!</span>
                                    </>
                                )}
                                <Badge variant="outline" className="ml-auto">
                                    +{selectedOptions[selectedOptions.length - 1]?.xpEarned} XP
                                </Badge>
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                {currentBranch.options.find(
                                    (o) => o.id === selectedOptions[selectedOptions.length - 1]?.optionId
                                )?.feedback}
                            </p>
                        </div>

                        <div className="mt-4 flex justify-end">
                            <Button onClick={handleContinue}>
                                {currentBranchIndex < scenario.branches.length - 1 ? "Continue" : "See Results"}
                                <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default ScenarioSimulator;
