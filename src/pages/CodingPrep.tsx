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

const difficultyColors = {
    easy: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800",
    hard: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
};

const categoryColors = {
    "Arrays": "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
    "Linked Lists": "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300",
    "Stacks": "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300",
    "Trees": "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
    "Graphs": "bg-pink-100 text-pink-800 dark:bg-pink-900/50 dark:text-pink-300",
    "Dynamic Programming": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300",
    "Design": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-300",
};

const CodingPrep = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [selectedLanguage, setSelectedLanguage] = useState<string>("java");
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
    const [completedProblems, setCompletedProblems] = useState<Set<string>>(new Set());

    // Load completed problems from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("completedCodingProblems");
        if (saved) {
            setCompletedProblems(new Set(JSON.parse(saved)));
        }
    }, []);

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

    const renderCodeBlock = (code: string, language: string) => (
        <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
            <code>{code}</code>
        </pre>
    );

    const renderProblemCard = (problem: CodingProblem) => {
        const isExpanded = expandedItems.has(problem.id);
        const isCompleted = completedProblems.has(problem.id);
        const solution = problem.solutions.find((s) => s.language === selectedLanguage) || problem.solutions[0];

        return (
            <Card
                key={problem.id}
                className={`overflow-hidden transition-all duration-300 border-gray-200 dark:border-gray-700 ${isCompleted ? "border-green-300 dark:border-green-700 bg-green-50/50 dark:bg-green-900/10" : ""
                    }`}
            >
                <div
                    className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                    onClick={() => toggleExpand(problem.id)}
                >
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleProblemComplete(problem.id);
                                    }}
                                    className="transition-transform hover:scale-110"
                                >
                                    {isCompleted ? (
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <Circle className="w-5 h-5 text-gray-400 hover:text-green-500" />
                                    )}
                                </button>
                                <Badge className={categoryColors[problem.category as keyof typeof categoryColors] || "bg-gray-100"}>
                                    {problem.category}
                                </Badge>
                                <Badge variant="outline" className={difficultyColors[problem.difficulty]}>
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
                            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </Button>
                    </div>

                    {isExpanded && (
                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-6">
                            {/* Constraints */}
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Constraints</h4>
                                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                    {problem.constraints.map((c, i) => (
                                        <li key={i}>{c}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Examples */}
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Examples</h4>
                                <div className="space-y-3">
                                    {problem.examples.map((ex, i) => (
                                        <div key={i} className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg text-sm">
                                            <div className="font-mono">
                                                <span className="text-gray-500">Input:</span> {ex.input}
                                            </div>
                                            <div className="font-mono">
                                                <span className="text-gray-500">Output:</span> {ex.output}
                                            </div>
                                            {ex.explanation && (
                                                <div className="text-gray-600 dark:text-gray-400 mt-1">
                                                    <span className="text-gray-500">Explanation:</span> {ex.explanation}
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
                                <p className="text-gray-700 dark:text-gray-300 text-sm">{problem.approach}</p>
                            </div>

                            {/* Solution */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-semibold text-gray-900 dark:text-white">Solution</h4>
                                    <div className="flex gap-2">
                                        {problem.solutions.map((sol) => (
                                            <Button
                                                key={sol.language}
                                                variant={selectedLanguage === sol.language ? "default" : "outline"}
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedLanguage(sol.language);
                                                }}
                                            >
                                                {sol.language}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                                {renderCodeBlock(solution.code, solution.language)}
                            </div>

                            {/* Complexity */}
                            <div className="flex gap-6">
                                <div className="flex items-center text-sm">
                                    <Clock className="w-4 h-4 mr-2 text-blue-500" />
                                    <span className="text-gray-600 dark:text-gray-400">Time: </span>
                                    <span className="ml-1 font-mono text-gray-900 dark:text-white">{problem.timeComplexity}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                    <Layers className="w-4 h-4 mr-2 text-purple-500" />
                                    <span className="text-gray-600 dark:text-gray-400">Space: </span>
                                    <span className="ml-1 font-mono text-gray-900 dark:text-white">{problem.spaceComplexity}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Card>
        );
    };

    const renderFundamentalCard = (topic: FundamentalTopic) => {
        const isExpanded = expandedItems.has(topic.id);

        return (
            <Card key={topic.id} className="overflow-hidden transition-all duration-300 border-gray-200 dark:border-gray-700">
                <div
                    className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                    onClick={() => toggleExpand(topic.id)}
                >
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{topic.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{topic.description}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </Button>
                    </div>

                    {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Points</h4>
                                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                    {topic.keyPoints.map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                            {topic.codeExample && (
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Code Example</h4>
                                    {renderCodeBlock(topic.codeExample.code, topic.codeExample.language)}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </Card>
        );
    };

    const renderPatternCard = (pattern: CodingPattern) => {
        const isExpanded = expandedItems.has(pattern.id);

        return (
            <Card key={pattern.id} className="overflow-hidden transition-all duration-300 border-gray-200 dark:border-gray-700">
                <div
                    className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                    onClick={() => toggleExpand(pattern.id)}
                >
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{pattern.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{pattern.description}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </Button>
                    </div>

                    {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">When to Use</h4>
                                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                    {pattern.whenToUse.map((use, i) => (
                                        <li key={i}>{use}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Template</h4>
                                {renderCodeBlock(pattern.codeTemplate.code, pattern.codeTemplate.language)}
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Related Problems</h4>
                                <div className="flex flex-wrap gap-2">
                                    {pattern.problems.map((problemId) => {
                                        const problem = codingProblems.find((p) => p.id === problemId);
                                        return problem ? (
                                            <Badge key={problemId} variant="outline" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
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

    const renderLanguageCard = (topic: LanguageTopic) => {
        const isExpanded = expandedItems.has(topic.id);

        return (
            <Card key={topic.id} className="overflow-hidden transition-all duration-300 border-gray-200 dark:border-gray-700">
                <div
                    className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                    onClick={() => toggleExpand(topic.id)}
                >
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                                <Badge variant="outline">{topic.language}</Badge>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{topic.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{topic.description}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </Button>
                    </div>

                    {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Points</h4>
                                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                    {topic.keyPoints.map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Example</h4>
                                {renderCodeBlock(topic.codeExample, topic.language)}
                            </div>
                        </div>
                    )}
                </div>
            </Card>
        );
    };

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
                        <Progress value={progressPercentage} className="h-2" />
                    </Card>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="problems" className="max-w-4xl mx-auto">
                    <TabsList className="grid w-full grid-cols-4 mb-8">
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
                                filteredProblems.map(renderProblemCard)
                            )}
                        </div>
                    </TabsContent>

                    {/* Fundamentals Tab */}
                    <TabsContent value="fundamentals" className="space-y-4">
                        <div className="grid gap-4">
                            {fundamentals.map(renderFundamentalCard)}
                        </div>
                    </TabsContent>

                    {/* Patterns Tab */}
                    <TabsContent value="patterns" className="space-y-4">
                        <div className="grid gap-4">
                            {codingPatterns.map(renderPatternCard)}
                        </div>
                    </TabsContent>

                    {/* Languages Tab */}
                    <TabsContent value="languages" className="space-y-4">
                        <div className="grid gap-4">
                            {languageTopics.map(renderLanguageCard)}
                        </div>
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
