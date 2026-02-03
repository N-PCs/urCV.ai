import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Trophy,
    Medal,
    TrendingUp,
    Crown,
    Sparkles,
} from "lucide-react";
import { mockLeaderboard, calculateLevel } from "@/lib/softSkillsContent";

interface LeaderboardProps {
    userXP: number;
    userName?: string;
}

const Leaderboard = ({ userXP, userName = "You" }: LeaderboardProps) => {
    const userLevel = calculateLevel(userXP);

    // Find user's rank based on XP
    const getUserRank = () => {
        for (let i = 0; i < mockLeaderboard.length; i++) {
            if (userXP >= mockLeaderboard[i].xp) {
                return i + 1;
            }
        }
        return mockLeaderboard.length + 1;
    };

    const userRank = getUserRank();

    // Insert user into leaderboard for display
    const displayLeaderboard = [...mockLeaderboard];
    const userEntry = {
        rank: userRank,
        name: userName,
        xp: userXP,
        level: userLevel,
        badge: "",
        isUser: true,
    };

    // If user is in top 10, replace that position
    if (userRank <= 10) {
        displayLeaderboard.splice(userRank - 1, 0, { ...userEntry });
        displayLeaderboard.pop(); // Keep only top 10
    }

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return <Crown className="w-5 h-5 text-yellow-500" />;
            case 2:
                return <Medal className="w-5 h-5 text-gray-400" />;
            case 3:
                return <Medal className="w-5 h-5 text-amber-600" />;
            default:
                return null;
        }
    };

    const getRankBadge = (rank: number) => {
        switch (rank) {
            case 1:
                return "🏆";
            case 2:
                return "🥈";
            case 3:
                return "🥉";
            default:
                return "";
        }
    };

    return (
        <div className="space-y-6">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-700">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg">
                            #{userRank}
                        </div>
                        <div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Your Rank</div>
                            <div className="text-xl font-bold text-gray-900 dark:text-white">
                                {userRank <= 10 ? `Top ${userRank * 10}%` : "Keep Going!"}
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Your XP</div>
                            <div className="text-xl font-bold text-gray-900 dark:text-white">
                                {userXP.toLocaleString()}
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Your Level</div>
                            <div className="text-xl font-bold text-gray-900 dark:text-white">
                                Level {userLevel}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Leaderboard Table */}
            <Card className="overflow-hidden">
                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-yellow-500" />
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Global Leaderboard</h2>
                    </div>
                </div>

                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {displayLeaderboard.slice(0, 10).map((entry, index) => {
                        const rank = index + 1;
                        const isUserEntry = (entry as typeof entry & { isUser?: boolean }).isUser;

                        return (
                            <div
                                key={entry.name + rank}
                                className={`flex items-center justify-between p-4 transition-colors ${isUserEntry
                                        ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500"
                                        : rank <= 3
                                            ? "bg-yellow-50/50 dark:bg-yellow-900/10"
                                            : "hover:bg-gray-50 dark:hover:bg-gray-900/30"
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    {/* Rank */}
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${rank === 1
                                            ? "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700"
                                            : rank === 2
                                                ? "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                                                : rank === 3
                                                    ? "bg-amber-100 dark:bg-amber-900/50 text-amber-700"
                                                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                                        }`}>
                                        {getRankIcon(rank) || rank}
                                    </div>

                                    {/* Name & Badge */}
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className={`font-medium ${isUserEntry ? "text-blue-700 dark:text-blue-400" : "text-gray-900 dark:text-white"}`}>
                                                {entry.name}
                                            </span>
                                            {getRankBadge(rank) && (
                                                <span className="text-lg">{getRankBadge(rank)}</span>
                                            )}
                                            {isUserEntry && (
                                                <Badge className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 text-xs">
                                                    You
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            Level {entry.level}
                                        </div>
                                    </div>
                                </div>

                                {/* XP */}
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-yellow-500" />
                                    <span className="font-bold text-gray-900 dark:text-white">
                                        {entry.xp.toLocaleString()}
                                    </span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">XP</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* User position if not in top 10 */}
                {userRank > 10 && (
                    <>
                        <div className="flex items-center justify-center py-2 text-gray-400 dark:text-gray-500">
                            <span className="text-sm">• • •</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center font-bold text-blue-700 dark:text-blue-300">
                                    {userRank}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-blue-700 dark:text-blue-400">{userName}</span>
                                        <Badge className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 text-xs">
                                            You
                                        </Badge>
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        Level {userLevel}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-yellow-500" />
                                <span className="font-bold text-gray-900 dark:text-white">
                                    {userXP.toLocaleString()}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">XP</span>
                            </div>
                        </div>
                    </>
                )}
            </Card>

            {/* Call to Action */}
            <Card className="p-6 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 border-purple-200 dark:border-purple-700">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">Climb the Ranks!</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Complete scenarios, writing exercises, and daily challenges to earn XP.
                        </p>
                    </div>
                    <Button variant="outline">
                        Start Practicing
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default Leaderboard;
