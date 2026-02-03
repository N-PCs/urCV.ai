import { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
    ArrowLeft,
    MessageSquare,
    Users,
    Lightbulb,
    Clock,
    Heart,
    Briefcase,
    CheckCircle,
    Circle,
    ChevronRight,
    ChevronDown,
    ChevronUp,
    Trophy,
    BookOpen,
    BarChart3,
    Award,
    Star,
    Target,
    Play,
    RotateCcw,
    Lock,
    Check,
    Flame,
    PenLine,
    Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
    skillCategories,
    quizQuestions,
    learningModules,
    achievements,
    getQuestionsByCategory,
    getModulesByCategory,
    calculateCategoryScore,
    type SkillCategory,
    type QuizQuestion,
    type LearningModule,
    type Achievement,
    // Phase 2 imports
    type Scenario,
    type WritingPrompt,
    type DailyChallenge,
    scenarios,
    writingPrompts,
    getTodaysChallenge,
    XP_REWARDS,
    calculateLevel,
    getXPForNextLevel,
    checkStreak,
} from "@/lib/softSkillsContent";

// Phase 2 Components
import ScenarioSimulator from "@/components/soft-skills/ScenarioSimulator";
import WritingExercise from "@/components/soft-skills/WritingExercise";
import DailyChallenges from "@/components/soft-skills/DailyChallenges";
import Leaderboard from "@/components/soft-skills/Leaderboard";
import XPProgressBar from "@/components/soft-skills/XPProgressBar";

// Icon mapping for skill categories
const categoryIcons: Record<string, React.ElementType> = {
    MessageSquare,
    Users,
    Lightbulb,
    Clock,
    Heart,
    Briefcase,
};

// Color mapping for categories
const categoryColorClasses: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
    blue: {
        bg: "bg-blue-100 dark:bg-blue-900/30",
        text: "text-blue-700 dark:text-blue-400",
        border: "border-blue-200 dark:border-blue-800",
        gradient: "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
    },
    purple: {
        bg: "bg-purple-100 dark:bg-purple-900/30",
        text: "text-purple-700 dark:text-purple-400",
        border: "border-purple-200 dark:border-purple-800",
        gradient: "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
    },
    yellow: {
        bg: "bg-yellow-100 dark:bg-yellow-900/30",
        text: "text-yellow-700 dark:text-yellow-400",
        border: "border-yellow-200 dark:border-yellow-800",
        gradient: "from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20",
    },
    green: {
        bg: "bg-green-100 dark:bg-green-900/30",
        text: "text-green-700 dark:text-green-400",
        border: "border-green-200 dark:border-green-800",
        gradient: "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
    },
    pink: {
        bg: "bg-pink-100 dark:bg-pink-900/30",
        text: "text-pink-700 dark:text-pink-400",
        border: "border-pink-200 dark:border-pink-800",
        gradient: "from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20",
    },
    indigo: {
        bg: "bg-indigo-100 dark:bg-indigo-900/30",
        text: "text-indigo-700 dark:text-indigo-400",
        border: "border-indigo-200 dark:border-indigo-800",
        gradient: "from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20",
    },
};

// Progress storage interface (Phase 2 enhanced)
interface SoftSkillsProgress {
    quizResults: {
        [categoryId: string]: {
            score: number;
            answers: { questionId: string; optionId: string }[];
            completedAt: number;
        };
    };
    completedModules: string[];
    earnedBadges: string[];
    progressHistory: {
        date: string;
        scores: { [categoryId: string]: number };
    }[];
    // Phase 2 fields
    totalXP: number;
    level: number;
    currentStreak: number;
    longestStreak: number;
    lastActivityDate: string;
    completedScenarios: { id: string; score: number; xpEarned: number; date: string }[];
    completedWritingPrompts: { id: string; date: string }[];
    dailyChallengesCompleted: { id: string; date: string }[];
    activityLog: { date: string; type: string; xpEarned: number; description: string }[];
}

const STORAGE_KEY = "softSkillsProgress";

const getInitialProgress = (): SoftSkillsProgress => ({
    quizResults: {},
    completedModules: [],
    earnedBadges: [],
    progressHistory: [],
    // Phase 2
    totalXP: 0,
    level: 1,
    currentStreak: 0,
    longestStreak: 0,
    lastActivityDate: "",
    completedScenarios: [],
    completedWritingPrompts: [],
    dailyChallengesCompleted: [],
    activityLog: [],
});

const SoftSkills = () => {
    // State management
    const [progress, setProgress] = useState<SoftSkillsProgress>(getInitialProgress());
    const [activeQuiz, setActiveQuiz] = useState<SkillCategory | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState<{ questionId: string; optionId: string }[]>([]);
    const [showQuizResults, setShowQuizResults] = useState(false);
    const [expandedModule, setExpandedModule] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<SkillCategory | "all">("all");

    // Phase 2 state
    const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
    const [activeWritingPrompt, setActiveWritingPrompt] = useState<WritingPrompt | null>(null);
    const [recentXP, setRecentXP] = useState(0);
    const [activeTab, setActiveTab] = useState("dashboard");

    // Load progress from localStorage
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Merge with initial to ensure new fields exist
                setProgress({ ...getInitialProgress(), ...parsed });
            } catch (e) {
                console.error("Error loading progress:", e);
            }
        }
    }, []);

    // Check and update streak on load
    useEffect(() => {
        if (progress.lastActivityDate) {
            const { maintained } = checkStreak(progress.lastActivityDate);
            if (!maintained && progress.currentStreak > 0) {
                // Streak was broken
                const newProgress = {
                    ...progress,
                    currentStreak: 0,
                };
                saveProgress(newProgress);
            }
        }
    }, []);

    // Save progress to localStorage
    const saveProgress = (newProgress: SoftSkillsProgress) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
        setProgress(newProgress);
    };

    // XP awarding function
    const awardXP = (amount: number, description: string): SoftSkillsProgress => {
        const today = new Date().toISOString().split("T")[0];
        const streakInfo = checkStreak(progress.lastActivityDate);

        let newStreak = progress.currentStreak;
        let streakBonus = 0;

        if (streakInfo.maintained && streakInfo.newStreak > 0) {
            newStreak = progress.currentStreak + 1;
            streakBonus = newStreak * XP_REWARDS.STREAK_BONUS_PER_DAY;
        } else if (!streakInfo.maintained) {
            newStreak = 1;
        }

        const totalAmount = amount + streakBonus;
        const newTotalXP = progress.totalXP + totalAmount;
        const newLevel = calculateLevel(newTotalXP);

        const newProgress = {
            ...progress,
            totalXP: newTotalXP,
            level: newLevel,
            currentStreak: newStreak,
            longestStreak: Math.max(progress.longestStreak, newStreak),
            lastActivityDate: today,
            activityLog: [
                { date: today, type: "xp", xpEarned: totalAmount, description },
                ...progress.activityLog,
            ].slice(0, 100), // Keep last 100 entries
        };

        setRecentXP(totalAmount);
        setTimeout(() => setRecentXP(0), 3000);

        return newProgress;
    };

    // Calculate overall progress
    const overallProgress = useMemo(() => {
        const completedQuizzes = Object.keys(progress.quizResults).length;
        const totalCategories = skillCategories.length;
        const averageScore =
            completedQuizzes > 0
                ? Object.values(progress.quizResults).reduce((sum, r) => sum + r.score, 0) / completedQuizzes
                : 0;
        return {
            completedQuizzes,
            totalCategories,
            averageScore: Math.round(averageScore * 10) / 10,
            completedModules: progress.completedModules.length,
            totalModules: learningModules.length,
            earnedBadges: progress.earnedBadges.length,
            totalBadges: achievements.length,
        };
    }, [progress]);

    // Check and award achievements
    const checkAchievements = (newProgress: SoftSkillsProgress): string[] => {
        const newBadges: string[] = [];

        achievements.forEach((achievement) => {
            if (newProgress.earnedBadges.includes(achievement.id)) return;

            let earned = false;

            switch (achievement.requirement.type) {
                case "quiz_complete":
                    earned = Object.keys(newProgress.quizResults).length >= achievement.requirement.value;
                    break;
                case "module_complete":
                    earned = newProgress.completedModules.length >= achievement.requirement.value;
                    break;
                case "score_threshold":
                    earned = Object.values(newProgress.quizResults).some(
                        (r) => r.score >= achievement.requirement.value
                    );
                    break;
                case "category_mastery":
                    if (achievement.requirement.categoryId) {
                        const categoryScore = newProgress.quizResults[achievement.requirement.categoryId]?.score || 0;
                        const categoryModules = getModulesByCategory(achievement.requirement.categoryId);
                        const completedCategoryModules = categoryModules.filter((m) =>
                            newProgress.completedModules.includes(m.id)
                        ).length;
                        earned =
                            categoryScore >= achievement.requirement.value &&
                            completedCategoryModules === categoryModules.length;
                    }
                    break;
            }

            if (earned) {
                newBadges.push(achievement.id);
            }
        });

        return newBadges;
    };

    // Quiz functions
    const startQuiz = (category: SkillCategory) => {
        setActiveQuiz(category);
        setCurrentQuestionIndex(0);
        setQuizAnswers([]);
        setShowQuizResults(false);
    };

    const handleAnswerSelect = (questionId: string, optionId: string) => {
        setQuizAnswers((prev) => {
            const filtered = prev.filter((a) => a.questionId !== questionId);
            return [...filtered, { questionId, optionId }];
        });
    };

    const nextQuestion = () => {
        if (!activeQuiz) return;
        const questions = getQuestionsByCategory(activeQuiz);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        } else {
            finishQuiz();
        }
    };

    const prevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
        }
    };

    const finishQuiz = () => {
        if (!activeQuiz) return;

        const score = calculateCategoryScore(quizAnswers);
        const category = skillCategories.find(c => c.id === activeQuiz)!;

        let newProgress = awardXP(XP_REWARDS.QUIZ_COMPLETE, `Completed ${category.name} assessment`);

        newProgress = {
            ...newProgress,
            quizResults: {
                ...progress.quizResults,
                [activeQuiz]: {
                    score,
                    answers: quizAnswers,
                    completedAt: Date.now(),
                },
            },
            progressHistory: [
                ...progress.progressHistory,
                {
                    date: new Date().toISOString().split("T")[0],
                    scores: {
                        ...Object.fromEntries(
                            Object.entries(progress.quizResults).map(([k, v]) => [k, v.score])
                        ),
                        [activeQuiz]: score,
                    },
                },
            ],
        };

        // Check for new achievements
        const newBadges = checkAchievements(newProgress);
        if (newBadges.length > 0) {
            newProgress.earnedBadges = [...progress.earnedBadges, ...newBadges];
        }

        saveProgress(newProgress);
        setShowQuizResults(true);
    };

    const closeQuiz = () => {
        setActiveQuiz(null);
        setCurrentQuestionIndex(0);
        setQuizAnswers([]);
        setShowQuizResults(false);
    };

    const retakeQuiz = () => {
        if (activeQuiz) {
            startQuiz(activeQuiz);
        }
    };

    // Module functions
    const toggleModuleComplete = (moduleId: string) => {
        const isCompleting = !progress.completedModules.includes(moduleId);
        const newCompletedModules = isCompleting
            ? [...progress.completedModules, moduleId]
            : progress.completedModules.filter((id) => id !== moduleId);

        let newProgress = progress;

        if (isCompleting) {
            const module = learningModules.find(m => m.id === moduleId);
            newProgress = awardXP(XP_REWARDS.MODULE_COMPLETE, `Completed module: ${module?.title || moduleId}`);
        }

        newProgress = {
            ...newProgress,
            completedModules: newCompletedModules,
        };

        // Check for new achievements
        const newBadges = checkAchievements(newProgress);
        if (newBadges.length > 0) {
            newProgress.earnedBadges = [...progress.earnedBadges, ...newBadges];
        }

        saveProgress(newProgress);
    };

    // Phase 2: Scenario completion handler
    const handleScenarioComplete = (xpEarned: number, optimalPath: boolean) => {
        if (!activeScenario) return;

        const today = new Date().toISOString().split("T")[0];
        let newProgress = awardXP(
            xpEarned,
            `Completed scenario: ${activeScenario.title}${optimalPath ? " (Perfect!)" : ""}`
        );

        newProgress = {
            ...newProgress,
            completedScenarios: [
                ...progress.completedScenarios,
                { id: activeScenario.id, score: xpEarned, xpEarned, date: today },
            ],
        };

        saveProgress(newProgress);
        setActiveScenario(null);
    };

    // Phase 2: Writing prompt completion handler
    const handleWritingComplete = (xpEarned: number) => {
        if (!activeWritingPrompt) return;

        const today = new Date().toISOString().split("T")[0];
        let newProgress = awardXP(xpEarned, `Completed writing exercise: ${activeWritingPrompt.title}`);

        newProgress = {
            ...newProgress,
            completedWritingPrompts: [
                ...progress.completedWritingPrompts,
                { id: activeWritingPrompt.id, date: today },
            ],
        };

        saveProgress(newProgress);
        setActiveWritingPrompt(null);
    };

    // Phase 2: Daily challenge handlers
    const handleDailyChallengeStart = (challenge: DailyChallenge) => {
        if (challenge.type === "scenario" && challenge.contentId) {
            const scenario = scenarios.find(s => s.id === challenge.contentId);
            if (scenario) setActiveScenario(scenario);
        } else if (challenge.type === "quiz") {
            setActiveTab("dashboard");
        } else if (challenge.type === "writing") {
            setActiveTab("practice");
        }
    };

    const handleDailyChallengeReflection = (challengeId: string) => {
        const today = new Date().toISOString().split("T")[0];
        const challenge = getTodaysChallenge();

        let newProgress = awardXP(XP_REWARDS.DAILY_CHALLENGE, `Completed daily challenge: ${challenge.title}`);

        newProgress = {
            ...newProgress,
            dailyChallengesCompleted: [
                ...progress.dailyChallengesCompleted,
                { id: challengeId, date: today },
            ],
        };

        saveProgress(newProgress);
    };

    // Check if today's challenge is completed
    const isTodayChallengeCompleted = useMemo(() => {
        const today = new Date().toISOString().split("T")[0];
        return progress.dailyChallengesCompleted.some(c => c.date === today);
    }, [progress.dailyChallengesCompleted]);

    // Render functions
    const renderCategoryIcon = (iconName: string, className: string = "w-5 h-5") => {
        const Icon = categoryIcons[iconName];
        return Icon ? <Icon className={className} /> : null;
    };

    const renderSkillCard = (category: (typeof skillCategories)[0]) => {
        const colors = categoryColorClasses[category.color];
        const quizResult = progress.quizResults[category.id];
        const categoryModules = getModulesByCategory(category.id);
        const completedCategoryModules = categoryModules.filter((m) =>
            progress.completedModules.includes(m.id)
        ).length;

        return (
            <Card
                key={category.id}
                className={`overflow-hidden transition-all duration-300 hover:shadow-lg border ${colors.border}`}
            >
                <div className={`p-6 bg-gradient-to-br ${colors.gradient}`}>
                    <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-lg ${colors.bg}`}>
                            {renderCategoryIcon(category.icon, `w-6 h-6 ${colors.text}`)}
                        </div>
                        {quizResult && (
                            <Badge className={`${colors.bg} ${colors.text} border-0`}>
                                {quizResult.score}/10
                            </Badge>
                        )}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{category.description}</p>

                    {quizResult ? (
                        <div className="mb-4">
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                                <span>Score</span>
                                <span>{quizResult.score}/10</span>
                            </div>
                            <Progress value={quizResult.score * 10} className="h-2" />
                        </div>
                    ) : (
                        <div className="mb-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                            Not assessed yet
                        </div>
                    )}

                    <div className="flex flex-wrap gap-1 mb-4">
                        {category.subcategories.slice(0, 3).map((sub) => (
                            <span
                                key={sub}
                                className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400"
                            >
                                {sub}
                            </span>
                        ))}
                        {category.subcategories.length > 3 && (
                            <span className="text-xs px-2 py-0.5 text-gray-500">
                                +{category.subcategories.length - 3} more
                            </span>
                        )}
                    </div>

                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                        {completedCategoryModules}/{categoryModules.length} modules completed
                    </div>

                    <Button
                        onClick={() => startQuiz(category.id)}
                        className="w-full"
                        variant={quizResult ? "outline" : "default"}
                    >
                        {quizResult ? (
                            <>
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Retake Assessment
                            </>
                        ) : (
                            <>
                                <Play className="w-4 h-4 mr-2" />
                                Start Assessment
                            </>
                        )}
                    </Button>
                </div>
            </Card>
        );
    };

    const renderQuizView = () => {
        if (!activeQuiz) return null;

        const questions = getQuestionsByCategory(activeQuiz);
        const currentQuestion = questions[currentQuestionIndex];
        const category = skillCategories.find((c) => c.id === activeQuiz)!;
        const colors = categoryColorClasses[category.color];
        const selectedAnswer = quizAnswers.find((a) => a.questionId === currentQuestion.id)?.optionId;

        if (showQuizResults) {
            const score = progress.quizResults[activeQuiz]?.score || calculateCategoryScore(quizAnswers);
            return (
                <div className="max-w-2xl mx-auto">
                    <Card className="p-8 text-center">
                        <div className={`w-24 h-24 rounded-full ${colors.bg} flex items-center justify-center mx-auto mb-6`}>
                            <Trophy className={`w-12 h-12 ${colors.text}`} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Assessment Complete!
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            You've completed the {category.name} assessment
                        </p>

                        <div className="flex items-center justify-center gap-2 mb-6">
                            <Sparkles className="w-5 h-5 text-yellow-500" />
                            <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">+{XP_REWARDS.QUIZ_COMPLETE} XP</span>
                        </div>

                        <div className={`inline-block px-8 py-4 rounded-lg ${colors.bg} mb-6`}>
                            <div className="text-4xl font-bold text-gray-900 dark:text-white">{score}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">out of 10</div>
                        </div>

                        <div className="mb-6">
                            <Progress value={score * 10} className="h-3" />
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 mb-8">
                            {score >= 8
                                ? "Excellent! You demonstrate strong skills in this area."
                                : score >= 6
                                    ? "Good progress! There's still room for improvement."
                                    : "Keep practicing! Check out the learning modules to improve."}
                        </p>

                        <div className="flex gap-4 justify-center">
                            <Button variant="outline" onClick={closeQuiz}>
                                Back to Dashboard
                            </Button>
                            <Button onClick={retakeQuiz}>
                                <RotateCcw className="w-4 h-4 mr-2" />
                                Retake Assessment
                            </Button>
                        </div>
                    </Card>
                </div>
            );
        }

        return (
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <Button variant="ghost" onClick={closeQuiz}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Exit Quiz
                    </Button>
                    <Badge className={`${colors.bg} ${colors.text}`}>{category.name}</Badge>
                </div>

                <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                        <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
                    </div>
                    <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="h-2" />
                </div>

                <Card className="p-6 mb-6">
                    {currentQuestion.scenario && (
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg mb-4 text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium">Scenario: </span>
                            {currentQuestion.scenario}
                        </div>
                    )}

                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {currentQuestion.question}
                    </h3>
                    <Badge variant="outline" className="mb-6">
                        {currentQuestion.subcategory}
                    </Badge>

                    <div className="space-y-3">
                        {currentQuestion.options.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => handleAnswerSelect(currentQuestion.id, option.id)}
                                className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${selectedAnswer === option.id
                                    ? `${colors.border} ${colors.bg}`
                                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div
                                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${selectedAnswer === option.id
                                            ? `${colors.border} ${colors.bg}`
                                            : "border-gray-300 dark:border-gray-600"
                                            }`}
                                    >
                                        {selectedAnswer === option.id && (
                                            <Check className={`w-4 h-4 ${colors.text}`} />
                                        )}
                                    </div>
                                    <span className="text-gray-700 dark:text-gray-300">{option.text}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </Card>

                <div className="flex justify-between">
                    <Button variant="outline" onClick={prevQuestion} disabled={currentQuestionIndex === 0}>
                        Previous
                    </Button>
                    <Button onClick={nextQuestion} disabled={!selectedAnswer}>
                        {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
                        <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>
        );
    };

    const renderModuleCard = (module: LearningModule) => {
        const isCompleted = progress.completedModules.includes(module.id);
        const isExpanded = expandedModule === module.id;
        const category = skillCategories.find((c) => c.id === module.category)!;
        const colors = categoryColorClasses[category.color];

        return (
            <Card
                key={module.id}
                className={`overflow-hidden transition-all duration-300 ${isCompleted ? "border-green-200 dark:border-green-800" : "border-gray-200 dark:border-gray-700"
                    }`}
            >
                <div
                    className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                    onClick={() => setExpandedModule(isExpanded ? null : module.id)}
                >
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleModuleComplete(module.id);
                                    }}
                                    className="transition-transform hover:scale-110"
                                >
                                    {isCompleted ? (
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <Circle className="w-5 h-5 text-gray-400 hover:text-green-500" />
                                    )}
                                </button>
                                <Badge className={`${colors.bg} ${colors.text}`}>{category.name}</Badge>
                                <Badge variant="outline" className="capitalize">
                                    {module.difficulty}
                                </Badge>
                                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {module.estimatedTime} min
                                </span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                {module.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{module.description}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </Button>
                    </div>

                    {isExpanded && (
                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-6">
                            <div className="prose prose-sm dark:prose-invert max-w-none">
                                <div className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                                    {module.content}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                                    <Star className="w-4 h-4 mr-2 text-yellow-500" />
                                    Key Takeaways
                                </h4>
                                <ul className="space-y-2">
                                    {module.keyTakeaways.map((takeaway, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                            {takeaway}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                                    <Target className="w-4 h-4 mr-2 text-blue-500" />
                                    Practical Exercises
                                </h4>
                                <ul className="space-y-2">
                                    {module.practicalExercises.map((exercise, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                                            {exercise}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleModuleComplete(module.id);
                                }}
                                variant={isCompleted ? "outline" : "default"}
                                className="w-full"
                            >
                                {isCompleted ? (
                                    <>
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Completed
                                    </>
                                ) : (
                                    <>
                                        <Circle className="w-4 h-4 mr-2" />
                                        Mark as Complete (+{XP_REWARDS.MODULE_COMPLETE} XP)
                                    </>
                                )}
                            </Button>
                        </div>
                    )}
                </div>
            </Card>
        );
    };

    const renderAchievementCard = (achievement: Achievement) => {
        const isEarned = progress.earnedBadges.includes(achievement.id);

        return (
            <Card
                key={achievement.id}
                className={`p-4 text-center transition-all duration-300 ${isEarned
                    ? "border-yellow-300 dark:border-yellow-700 bg-yellow-50/50 dark:bg-yellow-900/10"
                    : "border-gray-200 dark:border-gray-700 opacity-60"
                    }`}
            >
                <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 text-3xl ${isEarned ? "bg-yellow-100 dark:bg-yellow-900/30" : "bg-gray-100 dark:bg-gray-800"
                        }`}
                >
                    {isEarned ? achievement.icon : <Lock className="w-6 h-6 text-gray-400" />}
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{achievement.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{achievement.description}</p>
                {isEarned && (
                    <Badge className="mt-2 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                        Earned!
                    </Badge>
                )}
            </Card>
        );
    };

    // Render scenario if active
    if (activeScenario) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
                <nav className="border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Scenario Simulation</h1>
                            <XPProgressBar totalXP={progress.totalXP} compact recentXP={recentXP} />
                        </div>
                    </div>
                </nav>
                <div className="container mx-auto px-4 py-8">
                    <ScenarioSimulator
                        scenario={activeScenario}
                        onComplete={handleScenarioComplete}
                        onExit={() => setActiveScenario(null)}
                    />
                </div>
            </div>
        );
    }

    // Render writing exercise if active
    if (activeWritingPrompt) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
                <nav className="border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Writing Exercise</h1>
                            <XPProgressBar totalXP={progress.totalXP} compact recentXP={recentXP} />
                        </div>
                    </div>
                </nav>
                <div className="container mx-auto px-4 py-8">
                    <WritingExercise
                        prompt={activeWritingPrompt}
                        onComplete={handleWritingComplete}
                        onExit={() => setActiveWritingPrompt(null)}
                    />
                </div>
            </div>
        );
    }

    // Render quiz if active
    if (activeQuiz) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
                <nav className="border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Skill Assessment</h1>
                            <XPProgressBar totalXP={progress.totalXP} compact recentXP={recentXP} />
                        </div>
                    </div>
                </nav>
                <div className="container mx-auto px-4 py-8">{renderQuizView()}</div>
            </div>
        );
    }

    // Filter modules by category
    const filteredModules =
        selectedCategory === "all"
            ? learningModules
            : learningModules.filter((m) => m.category === selectedCategory);

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
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Soft Skills Practice</h1>
                        </div>
                        <XPProgressBar totalXP={progress.totalXP} compact recentXP={recentXP} />
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-4 py-8">
                {/* Header with XP */}
                <div className="max-w-4xl mx-auto mb-8">
                    <XPProgressBar totalXP={progress.totalXP} recentXP={recentXP} />
                </div>

                {/* Overall Progress Card */}
                <div className="max-w-4xl mx-auto mb-8">
                    <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {overallProgress.completedQuizzes}/{overallProgress.totalCategories}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Assessments</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {overallProgress.averageScore}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Avg Score</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {overallProgress.completedModules}/{overallProgress.totalModules}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Modules</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-1">
                                    <Flame className="w-6 h-6 text-orange-500" />
                                    {progress.currentStreak}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Day Streak</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {overallProgress.earnedBadges}/{overallProgress.totalBadges}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Badges</div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
                    <TabsList className="grid w-full grid-cols-6 mb-8">
                        <TabsTrigger value="dashboard" className="flex items-center gap-2">
                            <BarChart3 className="w-4 h-4" />
                            <span className="hidden sm:inline">Dashboard</span>
                        </TabsTrigger>
                        <TabsTrigger value="practice" className="flex items-center gap-2">
                            <Play className="w-4 h-4" />
                            <span className="hidden sm:inline">Practice</span>
                        </TabsTrigger>
                        <TabsTrigger value="challenges" className="flex items-center gap-2">
                            <Flame className="w-4 h-4" />
                            <span className="hidden sm:inline">Challenges</span>
                        </TabsTrigger>
                        <TabsTrigger value="learning" className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4" />
                            <span className="hidden sm:inline">Learning</span>
                        </TabsTrigger>
                        <TabsTrigger value="leaderboard" className="flex items-center gap-2">
                            <Trophy className="w-4 h-4" />
                            <span className="hidden sm:inline">Leaderboard</span>
                        </TabsTrigger>
                        <TabsTrigger value="achievements" className="flex items-center gap-2">
                            <Award className="w-4 h-4" />
                            <span className="hidden sm:inline">Badges</span>
                        </TabsTrigger>
                    </TabsList>

                    {/* Dashboard Tab */}
                    <TabsContent value="dashboard" className="space-y-6">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {skillCategories.map(renderSkillCard)}
                        </div>
                    </TabsContent>

                    {/* Practice Tab (NEW) */}
                    <TabsContent value="practice" className="space-y-8">
                        {/* Scenarios Section */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Play className="w-5 h-5 text-blue-500" />
                                Scenario Simulations
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Practice real-world situations with branching narratives. Make decisions and get instant feedback.
                            </p>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {scenarios.map((scenario) => {
                                    const category = skillCategories.find(c => c.id === scenario.category)!;
                                    const colors = categoryColorClasses[category.color];
                                    const isCompleted = progress.completedScenarios.some(s => s.id === scenario.id);

                                    return (
                                        <Card key={scenario.id} className={`p-6 ${colors.border} hover:shadow-lg transition-shadow`}>
                                            <div className="flex items-center justify-between mb-3">
                                                <Badge className={`${colors.bg} ${colors.text}`}>{category.name}</Badge>
                                                {isCompleted && <CheckCircle className="w-5 h-5 text-green-500" />}
                                            </div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{scenario.title}</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{scenario.context}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-1 text-sm text-yellow-600 dark:text-yellow-400">
                                                    <Sparkles className="w-4 h-4" />
                                                    Up to {scenario.totalXP} XP
                                                </div>
                                                <Button size="sm" onClick={() => setActiveScenario(scenario)}>
                                                    <Play className="w-4 h-4 mr-1" />
                                                    Start
                                                </Button>
                                            </div>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Writing Prompts Section */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <PenLine className="w-5 h-5 text-purple-500" />
                                Writing Exercises
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Practice professional writing skills with guided exercises and self-evaluation.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                {writingPrompts.map((prompt) => {
                                    const category = skillCategories.find(c => c.id === prompt.category)!;
                                    const colors = categoryColorClasses[category.color];
                                    const isCompleted = progress.completedWritingPrompts.some(w => w.id === prompt.id);

                                    return (
                                        <Card key={prompt.id} className={`p-6 ${colors.border} hover:shadow-lg transition-shadow`}>
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <Badge className={`${colors.bg} ${colors.text}`}>{category.name}</Badge>
                                                    <Badge variant="outline">{prompt.type}</Badge>
                                                </div>
                                                {isCompleted && <CheckCircle className="w-5 h-5 text-green-500" />}
                                            </div>
                                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{prompt.title}</h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{prompt.scenario}</p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-1 text-sm text-yellow-600 dark:text-yellow-400">
                                                    <Sparkles className="w-4 h-4" />
                                                    {prompt.xpReward} XP
                                                </div>
                                                <Button size="sm" onClick={() => setActiveWritingPrompt(prompt)}>
                                                    <PenLine className="w-4 h-4 mr-1" />
                                                    Start
                                                </Button>
                                            </div>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    </TabsContent>

                    {/* Challenges Tab (NEW) */}
                    <TabsContent value="challenges" className="space-y-6">
                        <DailyChallenges
                            currentStreak={progress.currentStreak}
                            longestStreak={progress.longestStreak}
                            completedToday={isTodayChallengeCompleted}
                            completedChallenges={progress.dailyChallengesCompleted}
                            onStartChallenge={handleDailyChallengeStart}
                            onCompleteReflection={handleDailyChallengeReflection}
                        />
                    </TabsContent>

                    {/* Learning Tab */}
                    <TabsContent value="learning" className="space-y-6">
                        <div className="flex flex-wrap gap-2 mb-6">
                            <Button
                                variant={selectedCategory === "all" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedCategory("all")}
                            >
                                All
                            </Button>
                            {skillCategories.map((cat) => (
                                <Button
                                    key={cat.id}
                                    variant={selectedCategory === cat.id ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSelectedCategory(cat.id)}
                                >
                                    {cat.name}
                                </Button>
                            ))}
                        </div>

                        <div className="space-y-4">{filteredModules.map(renderModuleCard)}</div>
                    </TabsContent>

                    {/* Leaderboard Tab (NEW) */}
                    <TabsContent value="leaderboard" className="space-y-6">
                        <Leaderboard userXP={progress.totalXP} />
                    </TabsContent>

                    {/* Achievements Tab */}
                    <TabsContent value="achievements" className="space-y-6">
                        <div className="text-center mb-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                                <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                                <span className="font-semibold text-yellow-800 dark:text-yellow-300">
                                    {overallProgress.earnedBadges} / {overallProgress.totalBadges} Badges Earned
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {achievements.map(renderAchievementCard)}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default SoftSkills;
