import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
    Search,
    Code,
    BookOpen,
    Puzzle,
    Layers,
    ChevronDown,
    ChevronUp,
    ArrowLeft,
    CheckCircle,
    Circle,
    Clock,
    Zap,
    Filter,
    BarChart3,
    RefreshCw,
    Trophy,
    Target,
    TrendingUp,
    AlertCircle,
    Loader2,
    User,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
    codingProblems,
    fundamentals,
    codingPatterns,
    languageTopics,
    categories,
    type CodingProblem,
    type FundamentalTopic,
    type CodingPattern,
    type LanguageTopic,
} from "@/lib/codingContent";
import {
    type PlatformStats,
    fetchLeetCodeStats,
    fetchCodeforcesStats,
    getCachedStats,
    setCachedStats,
    getCachedUsernames,
    setCachedUsernames,
    getCodeforcesRankColor,
} from "@/lib/platformStatsService";
import { useCallback } from "react";

import ProblemCard from "@/components/coding-prep/ProblemCard";
import FundamentalCard from "@/components/coding-prep/FundamentalCard";
import PatternCard from "@/components/coding-prep/PatternCard";
import LanguageCard from "@/components/coding-prep/LanguageCard";


const CodingPrep = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [selectedLanguage, setSelectedLanguage] = useState<string>("java");
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
    const [completedProblems, setCompletedProblems] = useState<Set<string>>(new Set());

    // Platform Stats State
    const [leetcodeUsername, setLeetcodeUsername] = useState("");
    const [codeforcesHandle, setCodeforcesHandle] = useState("");
    const [platformStats, setPlatformStats] = useState<PlatformStats | null>(null);
    const [isLoadingStats, setIsLoadingStats] = useState(false);
    const [statsErrors, setStatsErrors] = useState<{ leetcode?: string; codeforces?: string }>({});

    // Load completed problems from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("completedCodingProblems");
        if (saved) {
            setCompletedProblems(new Set(JSON.parse(saved)));
        }
    }, []);

    // Load cached platform stats
    useEffect(() => {
        const { leetcode, codeforces } = getCachedUsernames();
        setLeetcodeUsername(leetcode);
        setCodeforcesHandle(codeforces);

        const cachedStats = getCachedStats();
        if (cachedStats) {
            setPlatformStats(cachedStats);
        }
    }, []);

    // Fetch stats function
    const fetchStats = useCallback(async () => {
        if (!leetcodeUsername.trim() && !codeforcesHandle.trim()) return;

        setIsLoadingStats(true);
        setStatsErrors({});

        const newStats: PlatformStats = {
            leetcode: null,
            codeforces: null,
            lastFetched: Date.now(),
            errors: {},
        };

        // Fetch LeetCode stats
        if (leetcodeUsername.trim()) {
            try {
                newStats.leetcode = await fetchLeetCodeStats(leetcodeUsername);
            } catch (error) {
                newStats.errors.leetcode = error instanceof Error ? error.message : "Failed to fetch";
                setStatsErrors((prev) => ({ ...prev, leetcode: newStats.errors.leetcode }));
            }
        }

        // Fetch Codeforces stats
        if (codeforcesHandle.trim()) {
            try {
                newStats.codeforces = await fetchCodeforcesStats(codeforcesHandle);
            } catch (error) {
                newStats.errors.codeforces = error instanceof Error ? error.message : "Failed to fetch";
                setStatsErrors((prev) => ({ ...prev, codeforces: newStats.errors.codeforces }));
            }
        }

        setPlatformStats(newStats);
        setCachedStats(newStats);
        setCachedUsernames(leetcodeUsername, codeforcesHandle);
        setIsLoadingStats(false);
    }, [leetcodeUsername, codeforcesHandle]);


    // Save completed problems to localStorage
    const toggleProblemComplete = (id: string) => {
        const newCompleted = new Set(completedProblems);
        if (newCompleted.has(id)) {
            newCompleted.delete(id);
        } else {
            newCompleted.add(id);
        }
        setCompletedProblems(newCompleted);
        localStorage.setItem("completedCodingProblems", JSON.stringify([...newCompleted]));
    };

    const toggleExpand = (id: string) => {
        const newExpanded = new Set(expandedItems);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedItems(newExpanded);
    };

    // Filter problems
    const filteredProblems = codingProblems.filter((problem) => {
        const matchesSearch =
            problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            problem.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            problem.topics.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesDifficulty = selectedDifficulty === "all" || problem.difficulty === selectedDifficulty;
        const matchesCategory = selectedCategory === "all" || problem.category === selectedCategory;
        return matchesSearch && matchesDifficulty && matchesCategory;
    });

    // Calculate progress
    const progressPercentage = (completedProblems.size / codingProblems.length) * 100;



    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            {/* Navigation */}
            <nav className="border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link to="/">
                                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                                    <ArrowLeft className="w-4 h-4" />
                                    <span>Back to Home</span>
                                </Button>
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Coding Prep</h1>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Master Coding Interviews
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Comprehensive collection of coding interview questions with solutions, patterns, and explanations
                    </p>
                </div>

                {/* Progress Card */}
                <div className="max-w-4xl mx-auto mb-8">
                    <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-gray-900 dark:text-white">Your Progress</h3>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                {completedProblems.size} / {codingProblems.length} problems solved
                            </span>
                        </div>
                        <Progress value={progressPercentage} className="h-2 bg-gray-200 dark:bg-gray-800" />
                    </Card>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="problems" className="max-w-4xl mx-auto">
                    <TabsList className="grid w-full grid-cols-5 mb-8">
                        <TabsTrigger value="problems" className="flex items-center gap-2">
                            <Code className="w-4 h-4" />
                            <span className="hidden sm:inline">Problems</span>
                        </TabsTrigger>
                        <TabsTrigger value="fundamentals" className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4" />
                            <span className="hidden sm:inline">Fundamentals</span>
                        </TabsTrigger>
                        <TabsTrigger value="patterns" className="flex items-center gap-2">
                            <Puzzle className="w-4 h-4" />
                            <span className="hidden sm:inline">Patterns</span>
                        </TabsTrigger>
                        <TabsTrigger value="languages" className="flex items-center gap-2">
                            <Layers className="w-4 h-4" />
                            <span className="hidden sm:inline">Languages</span>
                        </TabsTrigger>
                        <TabsTrigger value="stats" className="flex items-center gap-2">
                            <BarChart3 className="w-4 h-4" />
                            <span className="hidden sm:inline">Stats</span>
                        </TabsTrigger>
                    </TabsList>

                    {/* Problems Tab */}
                    <TabsContent value="problems" className="space-y-6">
                        {/* Search and Filters */}
                        <div className="space-y-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                    type="text"
                                    placeholder="Search problems..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                                />
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <div className="flex items-center gap-2 mr-4">
                                    <Filter className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Difficulty:</span>
                                </div>
                                {["all", "easy", "medium", "hard"].map((diff) => (
                                    <Button
                                        key={diff}
                                        variant={selectedDifficulty === diff ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setSelectedDifficulty(diff)}
                                        className="capitalize"
                                    >
                                        {diff}
                                    </Button>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <div className="flex items-center gap-2 mr-4">
                                    <Layers className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Category:</span>
                                </div>
                                <Button
                                    variant={selectedCategory === "all" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSelectedCategory("all")}
                                >
                                    All
                                </Button>
                                {categories.problemCategories.map((cat) => (
                                    <Button
                                        key={cat.id}
                                        variant={selectedCategory === cat.id ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setSelectedCategory(cat.id)}
                                    >
                                        {cat.label}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Problems List */}
                        <div className="space-y-4">
                            {filteredProblems.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 dark:text-gray-400">No problems found matching your criteria.</p>
                                </div>
                            ) : (
                                filteredProblems.map((problem) => (
                                    <ProblemCard
                                        key={problem.id}
                                        problem={problem}
                                        isExpanded={expandedItems.has(problem.id)}
                                        isCompleted={completedProblems.has(problem.id)}
                                        selectedLanguage={selectedLanguage}
                                        onToggleExpand={toggleExpand}
                                        onToggleComplete={toggleProblemComplete}
                                        onSelectLanguage={setSelectedLanguage}
                                    />
                                ))
                            )}
                        </div>
                    </TabsContent>

                    {/* Fundamentals Tab */}
                    <TabsContent value="fundamentals" className="space-y-4">
                        <div className="grid gap-4">
                            {fundamentals.map((topic) => (
                                <FundamentalCard
                                    key={topic.id}
                                    topic={topic}
                                    isExpanded={expandedItems.has(topic.id)}
                                    onToggleExpand={toggleExpand}
                                />
                            ))}
                        </div>
                    </TabsContent>

                    {/* Patterns Tab */}
                    <TabsContent value="patterns" className="space-y-4">
                        <div className="grid gap-4">
                            {codingPatterns.map((pattern) => (
                                <PatternCard
                                    key={pattern.id}
                                    pattern={pattern}
                                    isExpanded={expandedItems.has(pattern.id)}
                                    onToggleExpand={toggleExpand}
                                />
                            ))}
                        </div>
                    </TabsContent>

                    {/* Languages Tab */}
                    <TabsContent value="languages" className="space-y-4">
                        <div className="grid gap-4">
                            {languageTopics.map((topic) => (
                                <LanguageCard
                                    key={topic.id}
                                    topic={topic}
                                    isExpanded={expandedItems.has(topic.id)}
                                    onToggleExpand={toggleExpand}
                                />
                            ))}
                        </div>
                    </TabsContent>

                    {/* Stats Tab */}
                    <TabsContent value="stats" className="space-y-6">
                        <Card className="p-6 border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    Platform Settings
                                </h3>
                                <Button
                                    onClick={fetchStats}
                                    disabled={isLoadingStats || (!leetcodeUsername && !codeforcesHandle)}
                                    size="sm"
                                    className="flex items-center gap-2"
                                >
                                    {isLoadingStats ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <RefreshCw className="w-4 h-4" />
                                    )}
                                    {isLoadingStats ? "Loading..." : "Fetch Stats"}
                                </Button>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        LeetCode Username
                                    </label>
                                    <Input
                                        placeholder="e.g., leetcode"
                                        value={leetcodeUsername}
                                        onChange={(e) => setLeetcodeUsername(e.target.value)}
                                        className="bg-white dark:bg-gray-900"
                                    />
                                    {statsErrors.leetcode && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            {statsErrors.leetcode}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Codeforces Handle
                                    </label>
                                    <Input
                                        placeholder="e.g., tourist"
                                        value={codeforcesHandle}
                                        onChange={(e) => setCodeforcesHandle(e.target.value)}
                                        className="bg-white dark:bg-gray-900"
                                    />
                                    {statsErrors.codeforces && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            {statsErrors.codeforces}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {platformStats?.lastFetched && (
                                <p className="text-xs text-gray-500 mt-3">
                                    Last updated: {new Date(platformStats.lastFetched).toLocaleString()}
                                </p>
                            )}
                        </Card>

                        {/* Stats Cards */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* LeetCode Stats Card */}
                            {platformStats?.leetcode && (
                                <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">LeetCode</h4>
                                        <Trophy className="w-6 h-6 text-yellow-500" />
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Total Solved</p>
                                            <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                                {platformStats.leetcode.totalSolved}
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="text-center p-2 bg-green-100 dark:bg-green-900/30 rounded">
                                                <p className="text-xs text-gray-600 dark:text-gray-400">Easy</p>
                                                <p className="text-lg font-bold text-green-700 dark:text-green-400">
                                                    {platformStats.leetcode.easySolved}
                                                </p>
                                            </div>
                                            <div className="text-center p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded">
                                                <p className="text-xs text-gray-600 dark:text-gray-400">Medium</p>
                                                <p className="text-lg font-bold text-yellow-700 dark:text-yellow-400">
                                                    {platformStats.leetcode.mediumSolved}
                                                </p>
                                            </div>
                                            <div className="text-center p-2 bg-red-100 dark:bg-red-900/30 rounded">
                                                <p className="text-xs text-gray-600 dark:text-gray-400">Hard</p>
                                                <p className="text-lg font-bold text-red-700 dark:text-red-400">
                                                    {platformStats.leetcode.hardSolved}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="pt-3 border-t border-yellow-200 dark:border-yellow-800">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600 dark:text-gray-400">Ranking</span>
                                                <span className="font-semibold text-gray-900 dark:text-white">
                                                    #{platformStats.leetcode.ranking.toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm mt-2">
                                                <span className="text-gray-600 dark:text-gray-400">Acceptance Rate</span>
                                                <span className="font-semibold text-gray-900 dark:text-white">
                                                    {platformStats.leetcode.acceptanceRate}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            )}

                            {/* Codeforces Stats Card */}
                            {platformStats?.codeforces && (
                                <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">Codeforces</h4>
                                        <Target className="w-6 h-6 text-blue-500" />
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Current Rating</p>
                                            <p className="text-3xl font-bold" style={{ color: getCodeforcesRankColor(platformStats.codeforces.rank) }}>
                                                {platformStats.codeforces.rating}
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded">
                                                <p className="text-xs text-gray-600 dark:text-gray-400">Max Rating</p>
                                                <p className="text-lg font-bold text-blue-700 dark:text-blue-400">
                                                    {platformStats.codeforces.maxRating}
                                                </p>
                                            </div>
                                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded">
                                                <p className="text-xs text-gray-600 dark:text-gray-400">Max Rank</p>
                                                <p className="text-sm font-bold text-purple-700 dark:text-purple-400 capitalize">
                                                    {platformStats.codeforces.maxRank}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="pt-3 border-t border-blue-200 dark:border-blue-800">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600 dark:text-gray-400">Current Rank</span>
                                                <span
                                                    className="font-semibold capitalize"
                                                    style={{ color: getCodeforcesRankColor(platformStats.codeforces.rank) }}
                                                >
                                                    {platformStats.codeforces.rank}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm mt-2">
                                                <span className="text-gray-600 dark:text-gray-400">Contribution</span>
                                                <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-1">
                                                    <TrendingUp className="w-4 h-4" />
                                                    {platformStats.codeforces.contribution}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            )}
                        </div>

                        {/* Empty State or Tips */}
                        {!platformStats?.leetcode && !platformStats?.codeforces && !isLoadingStats && (
                            <Card className="p-12 text-center border-gray-200 dark:border-gray-700">
                                <BarChart3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    Track Your Coding Progress
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    Enter your LeetCode username and/or Codeforces handle above to see your stats
                                </p>
                            </Card>
                        )}
                    </TabsContent>
                </Tabs>

                {/* Tips Section */}
                <div className="max-w-4xl mx-auto mt-12">
                    <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
                        <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-4">
                            💡 Coding Interview Tips
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4 text-green-800 dark:text-green-200">
                            <div className="flex items-start space-x-2">
                                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <p>Always clarify the problem before coding - ask about constraints and edge cases</p>
                            </div>
                            <div className="flex items-start space-x-2">
                                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <p>Think out loud - explain your approach as you work through the problem</p>
                            </div>
                            <div className="flex items-start space-x-2">
                                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <p>Start with a brute force solution, then optimize step by step</p>
                            </div>
                            <div className="flex items-start space-x-2">
                                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <p>Test your code with examples and edge cases before submitting</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CodingPrep;
