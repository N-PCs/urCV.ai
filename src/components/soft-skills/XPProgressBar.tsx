import { Sparkles, TrendingUp } from "lucide-react";
import { calculateLevel, getXPForNextLevel, LEVEL_THRESHOLDS } from "@/lib/softSkillsContent";

interface XPProgressBarProps {
    totalXP: number;
    showDetails?: boolean;
    compact?: boolean;
    recentXP?: number;
}

const XPProgressBar = ({ totalXP, showDetails = true, compact = false, recentXP }: XPProgressBarProps) => {
    const level = calculateLevel(totalXP);
    const { current, required, progress } = getXPForNextLevel(totalXP);
    const isMaxLevel = level >= LEVEL_THRESHOLDS.length;

    if (compact) {
        return (
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full border border-purple-200 dark:border-purple-700">
                    <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-sm font-bold text-purple-700 dark:text-purple-300">Lvl {level}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-full border border-yellow-200 dark:border-yellow-700">
                    <Sparkles className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                    <span className="text-sm font-bold text-yellow-700 dark:text-yellow-300">{totalXP.toLocaleString()} XP</span>
                </div>
                {recentXP && recentXP > 0 && (
                    <span className="text-sm font-medium text-green-600 dark:text-green-400 animate-pulse">
                        +{recentXP} XP
                    </span>
                )}
            </div>
        );
    }

    return (
        <div className="p-4 bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {level}
                    </div>
                    <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Level {level}</div>
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-yellow-500" />
                            <span className="font-bold text-gray-900 dark:text-white">{totalXP.toLocaleString()} XP</span>
                            {recentXP && recentXP > 0 && (
                                <span className="text-sm font-medium text-green-600 dark:text-green-400 animate-pulse">
                                    +{recentXP}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                {showDetails && !isMaxLevel && (
                    <div className="text-right">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Next Level</div>
                        <div className="font-medium text-gray-900 dark:text-white">
                            {current} / {required} XP
                        </div>
                    </div>
                )}
            </div>

            {/* Progress bar */}
            {!isMaxLevel && (
                <div className="relative">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 rounded-full transition-all duration-500 ease-out relative"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                        >
                            <div className="absolute inset-0 bg-white/30 animate-pulse" />
                        </div>
                    </div>
                    {showDetails && (
                        <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                            <span>Level {level}</span>
                            <span>Level {level + 1}</span>
                        </div>
                    )}
                </div>
            )}

            {isMaxLevel && (
                <div className="text-center py-2">
                    <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                        🎉 Max Level Reached!
                    </span>
                </div>
            )}
        </div>
    );
};

export default XPProgressBar;
