import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronUp, ChevronDown } from "lucide-react";
import { LanguageTopic } from "@/lib/codingContent";
import CodeBlock from "./CodeBlock";

interface LanguageCardProps {
    topic: LanguageTopic;
    isExpanded: boolean;
    onToggleExpand: (id: string) => void;
}

const LanguageCard: React.FC<LanguageCardProps> = ({
    topic,
    isExpanded,
    onToggleExpand,
}) => {
    return (
        <Card className="overflow-hidden transition-all duration-300 border-gray-200 dark:border-gray-700">
            <div
                className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                onClick={() => onToggleExpand(topic.id)}
            >
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="outline">{topic.language}</Badge>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {topic.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {topic.description}
                        </p>
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
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                Key Points
                            </h4>
                            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                {topic.keyPoints.map((point, i) => (
                                    <li key={i}>{point}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                                Example
                            </h4>
                            <CodeBlock code={topic.codeExample} language={topic.language} />
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default LanguageCard;
