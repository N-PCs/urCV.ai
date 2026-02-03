import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Flame,
    Calendar,
    CheckCircle,
    Play,
    Sparkles,
    BookOpen,
    PenLine,
    Brain,
    MessageSquare,
} from "lucide-react";
import {
    type DailyChallenge as DailyChallengeType,
    getTodaysChallenge,
    skillCategories,
} from "@/lib/softSkillsContent";

const challengeTypeIcons: Record<string, React.ReactNode> = {
    scenario: <Play className="w-5 h-5" />,
    quiz: <Brain className="w-5 h-5" />,
    writing: <PenLine className="w-5 h-5" />,
    reflection: <BookOpen className="w-5 h-5" />,
};

// Color mapping
const categoryColorClasses: Record<string, { bg: string; text: string; border: string }> = {
    blue: { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-700 dark:text-blue-400", border: "border-blue-200 dark:border-blue-800" },
    purple: { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-400", border: "border-purple-200 dark:border-purple-800" },
    yellow: { bg: "bg-yellow-100 dark:bg-yellow-900/30", text: "text-yellow-700 dark:text-yellow-400", border: "border-yellow-200 dark:border-yellow-800" },
    green: { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-700 dark:text-green-400", border: "border-green-200 dark:border-green-800" },
    pink: { bg: "bg-pink-100 dark:bg-pink-900/30", text: "text-pink-700 dark:text-pink-400", border: "border-pink-200 dark:border-pink-800" },
    indigo: { bg: "bg-indigo-100 dark:bg-indigo-900/30", text: "text-indigo-700 dark:text-indigo-400", border: "border-indigo-200 dark:border-indigo-800" },
};

interface DailyChallengesProps {
    currentStreak: number;
    longestStreak: number;
    completedToday: boolean;
    completedChallenges: { id: string; date: string }[];
    onStartChallenge: (challenge: DailyChallengeType) => void;
    onCompleteReflection: (challengeId: string) => void;
}

const DailyChallenges = ({
    currentStreak,
    longestStreak,
    completedToday,
    completedChallenges,
    onStartChallenge,
    onCompleteReflection,
}: DailyChallengesProps) => {
    const todaysChallenge = getTodaysChallenge();
    const category = skillCategories.find((c) => c.id === todaysChallenge.category)!;
    const colors = categoryColorClasses[category.color];

    // Generate streak calendar (last 7 days)
    const streakDays = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        const dateStr = date.toISOString().split("T")[0];
        const isCompleted = completedChallenges.some((c) => c.date.startsWith(dateStr));
        const isToday = i === 6;
        return { date, dateStr, isCompleted, isToday };
    });

    const getDayLabel = (date: Date) => {
        const days = ["S", "M", "T", "W", "T", "F", "S"];
        return days[date.getDay()];
    };

    return (
        <div className="space-y-6">
            {/* Streak Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Current Streak */}
                <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm text-orange-600 dark:text-orange-400 font-medium mb-1">
                                Current Streak
                            </div>
                            <div className="flex items-center gap-2">
                                <Flame className="w-8 h-8 text-orange-500" />
                                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                                    {currentStreak}
                                </span>
                                <span className="text-lg text-gray-500 dark:text-gray-400">days</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-gray-500 dark:text-gray-400">Best Streak</div>
                            <div className="text-xl font-bold text-gray-700 dark:text-gray-300">{longestStreak} days</div>
                        </div>
                    </div>
                </Card>

                {/* Streak Calendar */}
                <Card className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Calendar className="w-5 h-5 text-gray-500" />
                        <span className="font-medium text-gray-700 dark:text-gray-300">This Week</span>
                    </div>
                    <div className="flex justify-between gap-2">
                        {streakDays.map(({ date, dateStr, isCompleted, isToday }) => (
                            <div key={dateStr} className="flex flex-col items-center gap-1">
                                <span className="text-xs text-gray-500 dark:text-gray-400">{getDayLabel(date)}</span>
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isCompleted
                                            ? "bg-green-500 text-white"
                                            : isToday
                                                ? "bg-orange-100 dark:bg-orange-900/30 border-2 border-orange-500"
                                                : "bg-gray-100 dark:bg-gray-800"
                                        }`}
                                >
                                    {isCompleted ? (
                                        <CheckCircle className="w-4 h-4" />
                                    ) : isToday ? (
                                        <Flame className="w-4 h-4 text-orange-500" />
                                    ) : null}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Today's Challenge */}
            <Card className={`p-6 ${!completedToday ? colors.bg : "bg-green-50 dark:bg-green-900/20"} border-2 ${!completedToday ? colors.border : "border-green-300 dark:border-green-700"}`}>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <MessageSquare className={`w-5 h-5 ${!completedToday ? colors.text : "text-green-600 dark:text-green-400"}`} />
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Today's Challenge</h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                            {challengeTypeIcons[todaysChallenge.type]}
                            {todaysChallenge.type}
                        </Badge>
                        <Badge className={`${colors.bg} ${colors.text}`}>
                            {category.name}
                        </Badge>
                    </div>
                </div>

                <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{todaysChallenge.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{todaysChallenge.description}</p>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
                            +{todaysChallenge.xpReward} XP
                        </span>
                    </div>

                    {completedToday ? (
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-medium">Completed!</span>
                        </div>
                    ) : (
                        <Button
                            onClick={() => {
                                if (todaysChallenge.type === "reflection") {
                                    onCompleteReflection(todaysChallenge.id);
                                } else {
                                    onStartChallenge(todaysChallenge);
                                }
                            }}
                        >
                            {todaysChallenge.type === "reflection" ? (
                                <>
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Mark Complete
                                </>
                            ) : (
                                <>
                                    <Play className="w-4 h-4 mr-2" />
                                    Start Challenge
                                </>
                            )}
                        </Button>
                    )}
                </div>
            </Card>

            {/* Streak Motivation */}
            {currentStreak > 0 && !completedToday && (
                <Card className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-800 flex items-center justify-center">
                            <Flame className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <div>
                            <p className="font-medium text-yellow-800 dark:text-yellow-300">
                                Don't break your {currentStreak}-day streak!
                            </p>
                            <p className="text-sm text-yellow-600 dark:text-yellow-400">
                                Complete today's challenge to keep it going.
                            </p>
                        </div>
                    </div>
                </Card>
            )}

            {/* Streak Bonus Info */}
            {currentStreak >= 3 && (
                <Card className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            <span className="text-purple-800 dark:text-purple-300 font-medium">
                                Streak Bonus Active!
                            </span>
                        </div>
                        <Badge className="bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300">
                            +{currentStreak * 10} XP per activity
                        </Badge>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default DailyChallenges;
