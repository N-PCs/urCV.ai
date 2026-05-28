import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
    ArrowLeft,
    CheckCircle,
    FileText,
    Eye,
    EyeOff,
    Sparkles,
    ListChecks,
    Send,
} from "lucide-react";
import {
    type WritingPrompt,
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

const typeIcons: Record<string, string> = {
    email: "📧",
    message: "💬",
    report: "📊",
    feedback: "📝",
};

interface WritingExerciseProps {
    prompt: WritingPrompt;
    onComplete: (xpEarned: number) => void;
    onExit: () => void;
}

const WritingExercise = ({ prompt, onComplete, onExit }: WritingExerciseProps) => {
    const [userResponse, setUserResponse] = useState("");
    const [showSample, setShowSample] = useState(false);
    const [checkedCriteria, setCheckedCriteria] = useState<Set<string>>(new Set());
    const [isSubmitted, setIsSubmitted] = useState(false);

    const category = skillCategories.find((c) => c.id === prompt.category)!;
    const colors = categoryColorClasses[category.color];

    const handleToggleCriteria = (criterion: string) => {
        const newChecked = new Set(checkedCriteria);
        if (newChecked.has(criterion)) {
            newChecked.delete(criterion);
        } else {
            newChecked.add(criterion);
        }
        setCheckedCriteria(newChecked);
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
    };

    const handleComplete = () => {
        onComplete(prompt.xpReward);
    };

    const completionPercentage = (checkedCriteria.size / prompt.evaluationCriteria.length) * 100;

    if (isSubmitted) {
        return (
            <div className="max-w-3xl mx-auto">
                <Card className="p-8 text-center">
                    <div className={`w-20 h-20 rounded-full ${colors.bg} flex items-center justify-center mx-auto mb-6`}>
                        <CheckCircle className={`w-10 h-10 ${colors.text}`} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Exercise Complete!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {prompt.title}
                    </p>

                    <div className={`inline-flex items-center gap-2 px-6 py-4 rounded-lg ${colors.bg} mb-6`}>
                        <Sparkles className={`w-6 h-6 ${colors.text}`} />
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">+{prompt.xpReward} XP</span>
                    </div>

                    <div className="mb-6">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            Self-Assessment Score
                        </div>
                        <div className="text-lg font-medium text-gray-900 dark:text-white">
                            {checkedCriteria.size} / {prompt.evaluationCriteria.length} criteria met
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
                            <div
                                className={`h-full ${colors.bg.replace("100", "500").replace("/30", "")} transition-all duration-500`}
                                style={{ width: `${completionPercentage}%` }}
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                            Revise Response
                        </Button>
                        <Button onClick={handleComplete}>
                            Complete & Earn XP
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <Button variant="ghost" onClick={onExit}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Exercises
                </Button>
                <div className="flex items-center gap-2">
                    <Badge className={`${colors.bg} ${colors.text}`}>{category.name}</Badge>
                    <Badge variant="outline">{typeIcons[prompt.type]} {prompt.type}</Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Scenario */}
                    <Card className={`p-6 ${colors.bg} border ${colors.border}`}>
                        <div className="flex items-center gap-2 mb-3">
                            <FileText className={`w-5 h-5 ${colors.text}`} />
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">{prompt.title}</h2>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{prompt.scenario}</p>
                    </Card>

                    {/* Writing Area */}
                    <Card className="p-6">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Your Response</h3>
                        <Textarea
                            value={userResponse}
                            onChange={(e) => setUserResponse(e.target.value)}
                            placeholder={`Write your ${prompt.type} here...`}
                            className="min-h-[300px] resize-y"
                        />
                        <div className="flex justify-between items-center mt-4">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {userResponse.length} characters
                            </span>
                            <Button
                                onClick={handleSubmit}
                                disabled={userResponse.length < 50}
                            >
                                <Send className="w-4 h-4 mr-2" />
                                Submit for Self-Review
                            </Button>
                        </div>
                    </Card>

                    {/* Sample Response (Collapsible) */}
                    <Card className="p-6">
                        <button
                            onClick={() => setShowSample(!showSample)}
                            className="flex items-center justify-between w-full text-left"
                        >
                            <div className="flex items-center gap-2">
                                {showSample ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
                                <span className="font-semibold text-gray-900 dark:text-white">
                                    {showSample ? "Hide" : "View"} Sample Response
                                </span>
                            </div>
                            <Badge variant="outline" className="text-xs">Hint</Badge>
                        </button>

                        {showSample && (
                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 font-sans bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                                    {prompt.sampleResponse}
                                </pre>
                            </div>
                        )}
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Guidelines */}
                    <Card className="p-6">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <ListChecks className="w-5 h-5" />
                            Writing Guidelines
                        </h3>
                        <ul className="space-y-3">
                            {prompt.guidelines.map((guideline, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <span className={`w-5 h-5 rounded-full ${colors.bg} ${colors.text} flex items-center justify-center text-xs flex-shrink-0`}>
                                        {index + 1}
                                    </span>
                                    {guideline}
                                </li>
                            ))}
                        </ul>
                    </Card>

                    {/* Self-Evaluation Checklist */}
                    <Card className="p-6">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                            Self-Evaluation
                        </h3>
                        <div className="space-y-3">
                            {prompt.evaluationCriteria.map((criterion, index) => (
                                <label
                                    key={index}
                                    className="flex items-start gap-3 cursor-pointer group"
                                >
                                    <input
                                        type="checkbox"
                                        checked={checkedCriteria.has(criterion)}
                                        onChange={() => handleToggleCriteria(criterion)}
                                        className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className={`text-sm transition-colors ${checkedCriteria.has(criterion)
                                            ? "text-gray-900 dark:text-white"
                                            : "text-gray-600 dark:text-gray-400"
                                        }`}>
                                        {criterion}
                                    </span>
                                </label>
                            ))}
                        </div>

                        {/* Progress */}
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-500 dark:text-gray-400">Completion</span>
                                <span className="text-gray-900 dark:text-white font-medium">
                                    {checkedCriteria.size}/{prompt.evaluationCriteria.length}
                                </span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-green-500 transition-all duration-300"
                                    style={{ width: `${completionPercentage}%` }}
                                />
                            </div>
                        </div>
                    </Card>

                    {/* XP Reward */}
                    <Card className={`p-6 ${colors.bg} border ${colors.border}`}>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">XP Reward</span>
                            <div className="flex items-center gap-1">
                                <Sparkles className={`w-4 h-4 ${colors.text}`} />
                                <span className={`font-bold ${colors.text}`}>+{prompt.xpReward} XP</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default WritingExercise;
