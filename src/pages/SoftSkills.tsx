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
} from "@/lib/softSkillsContent";

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

// Progress storage interface
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
}

const STORAGE_KEY = "softSkillsProgress";

const getInitialProgress = (): SoftSkillsProgress => ({
    quizResults: {},
    completedModules: [],
    earnedBadges: [],
    progressHistory: [],
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

    // Load progress from localStorage
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setProgress(JSON.parse(saved));
            } catch (e) {
                console.error("Error loading progress:", e);
            }
        }
    }, []);

    // Save progress to localStorage
    const saveProgress = (newProgress: SoftSkillsProgress) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
        setProgress(newProgress);
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
            // Quiz complete
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
        const newProgress = {
            ...progress,
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
        const newCompletedModules = progress.completedModules.includes(moduleId)
            ? progress.completedModules.filter((id) => id !== moduleId)
            : [...progress.completedModules, moduleId];

        const newProgress = {
            ...progress,
            completedModules: newCompletedModules,
        };

        // Check for new achievements
        const newBadges = checkAchievements(newProgress);
        if (newBadges.length > 0) {
            newProgress.earnedBadges = [...progress.earnedBadges, ...newBadges];
        }

        saveProgress(newProgress);
    };

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

                    {/* Progress bar */}
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

                    {/* Subcategories */}
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

                    {/* Module progress */}
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
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            You've completed the {category.name} assessment
                        </p>

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
                {/* Quiz header */}
                <div className="flex items-center justify-between mb-6">
                    <Button variant="ghost" onClick={closeQuiz}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Exit Quiz
                    </Button>
                    <Badge className={`${colors.bg} ${colors.text}`}>{category.name}</Badge>
                </div>

                {/* Progress */}
                <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <span>
                            Question {currentQuestionIndex + 1} of {questions.length}
                        </span>
                        <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
                    </div>
                    <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="h-2" />
                </div>

                {/* Question card */}
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

                {/* Navigation */}
                <div className="flex justify-between">
                    <Button variant="outline" onClick={prevQuestion} disabled={currentQuestionIndex === 0}>
                        Previous
                    </Button>
                    <Button
                        onClick={nextQuestion}
                        disabled={!selectedAnswer}
                    >
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
                            {/* Content */}
                            <div className="prose prose-sm dark:prose-invert max-w-none">
                                <div className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                                    {module.content}
                                </div>
                            </div>

                            {/* Key Takeaways */}
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

                            {/* Practical Exercises */}
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

                            {/* Mark Complete Button */}
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
                                        Mark as Complete
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

    // Render quiz if active
    if (activeQuiz) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
                <nav className="border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Skill Assessment</h1>
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
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Develop Your Soft Skills
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Assess, learn, and grow your professional soft skills through interactive quizzes and comprehensive learning modules
                    </p>
                </div>

                {/* Overall Progress Card */}
                <div className="max-w-4xl mx-auto mb-8">
                    <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
                                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {overallProgress.earnedBadges}/{overallProgress.totalBadges}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Badges</div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="dashboard" className="max-w-6xl mx-auto">
                    <TabsList className="grid w-full grid-cols-4 mb-8">
                        <TabsTrigger value="dashboard" className="flex items-center gap-2">
                            <BarChart3 className="w-4 h-4" />
                            <span className="hidden sm:inline">Dashboard</span>
                        </TabsTrigger>
                        <TabsTrigger value="learning" className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4" />
                            <span className="hidden sm:inline">Learning</span>
                        </TabsTrigger>
                        <TabsTrigger value="progress" className="flex items-center gap-2">
                            <Target className="w-4 h-4" />
                            <span className="hidden sm:inline">Progress</span>
                        </TabsTrigger>
                        <TabsTrigger value="achievements" className="flex items-center gap-2">
                            <Award className="w-4 h-4" />
                            <span className="hidden sm:inline">Achievements</span>
                        </TabsTrigger>
                    </TabsList>

                    {/* Dashboard Tab */}
                    <TabsContent value="dashboard" className="space-y-6">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {skillCategories.map(renderSkillCard)}
                        </div>
                    </TabsContent>

                    {/* Learning Tab */}
                    <TabsContent value="learning" className="space-y-6">
                        {/* Category filter */}
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

                    {/* Progress Tab */}
                    <TabsContent value="progress" className="space-y-6">
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                                Skill Scores Overview
                            </h3>
                            <div className="space-y-4">
                                {skillCategories.map((category) => {
                                    const result = progress.quizResults[category.id];
                                    const colors = categoryColorClasses[category.color];
                                    return (
                                        <div key={category.id}>
                                            <div className="flex justify-between items-center mb-2">
                                                <div className="flex items-center gap-2">
                                                    {renderCategoryIcon(category.icon, `w-4 h-4 ${colors.text}`)}
                                                    <span className="font-medium text-gray-700 dark:text-gray-300">
                                                        {category.name}
                                                    </span>
                                                </div>
                                                <span className={`font-semibold ${result ? colors.text : "text-gray-400"}`}>
                                                    {result ? `${result.score}/10` : "Not assessed"}
                                                </span>
                                            </div>
                                            <Progress
                                                value={result ? result.score * 10 : 0}
                                                className="h-3"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </Card>

                        {/* History */}
                        {progress.progressHistory.length > 0 && (
                            <Card className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Assessment History
                                </h3>
                                <div className="space-y-3">
                                    {progress.progressHistory
                                        .slice(-10)
                                        .reverse()
                                        .map((entry, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0"
                                            >
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    {new Date(entry.date).toLocaleDateString()}
                                                </span>
                                                <div className="flex gap-2">
                                                    {Object.entries(entry.scores).map(([catId, score]) => {
                                                        const cat = skillCategories.find((c) => c.id === catId);
                                                        const colors = cat
                                                            ? categoryColorClasses[cat.color]
                                                            : categoryColorClasses.blue;
                                                        return (
                                                            <Badge
                                                                key={catId}
                                                                className={`${colors.bg} ${colors.text} text-xs`}
                                                            >
                                                                {cat?.name.split(" ")[0]}: {score}
                                                            </Badge>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </Card>
                        )}
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
