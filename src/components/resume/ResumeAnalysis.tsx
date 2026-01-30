import { useState, useRef, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { analyzeATS } from "@/lib/atsAnalyzer";

import {
  analyzeResume,
  enhanceResume,
  extractResumeDataWithAI,
  ResumeAnalysis,
} from "@/services/groqService";

import { parseResumeFile } from "@/services/fileParserService";
import { ResumeData } from "@/pages/Builder";
import { useToast } from "@/hooks/use-toast";
import { Bot, Upload, FileText, Type } from "lucide-react";

interface ResumeAnalysisProps {
  data: ResumeData;
  onEnhance: (enhancedData: ResumeData) => void;
  onExtractedData: (extractedData: ResumeData) => void;
}

const ResumeAnalysisComponent = ({
  data,
  onEnhance,
  onExtractedData,
}: ResumeAnalysisProps) => {
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState("");
  const [extractionMethod, setExtractionMethod] =
    useState<"file" | "text">("file");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  /* ---------------- ATS ANALYSIS (RULE-BASED) ---------------- */
  const ats = useMemo(() => analyzeATS(data), [data]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  /* ---------------- AI ACTIONS ---------------- */

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeResume(data);
      setAnalysis(result);
      toast({
        title: "Analysis Complete",
        description: "Your resume has been analyzed successfully!",
      });
    } catch {
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleEnhance = async () => {
    setIsEnhancing(true);
    try {
      const enhanced = await enhanceResume(data);
      onEnhance(enhanced);
      toast({
        title: "Resume Enhanced",
        description: "Your resume has been improved with AI suggestions!",
      });
    } catch {
      toast({
        title: "Enhancement Failed",
        description: "Failed to enhance resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setIsExtracting(true);

    try {
      const fileText = await parseResumeFile(file);
      const extractedData = await extractResumeDataWithAI(fileText);
      onExtractedData(extractedData);

      toast({
        title: "Resume Extracted",
        description: "Your resume data has been extracted successfully!",
      });
    } catch {
      toast({
        title: "Extraction Failed",
        description: "Failed to extract resume data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExtracting(false);
    }
  };

  const handleTextExtraction = async () => {
    if (!resumeText.trim()) {
      toast({
        title: "No Text Provided",
        description: "Please paste your resume text before extracting.",
        variant: "destructive",
      });
      return;
    }

    setIsExtracting(true);

    try {
      const extractedData = await extractResumeDataWithAI(resumeText);
      onExtractedData(extractedData);

      toast({
        title: "Resume Extracted",
        description: "Your resume data has been extracted successfully!",
      });
    } catch {
      toast({
        title: "Extraction Failed",
        description: "Failed to extract resume data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExtracting(false);
    }
  };

  return (
    <Card className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <Bot className="w-5 h-5 text-blue-600" />
        <h3 className="text-xl font-bold">AI Resume Analysis</h3>
      </div>

      {/* ATS SCORE — ALWAYS VISIBLE */}
      <Card className="p-5 border dark:border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-lg font-semibold">ATS Compatibility Score</h4>
          <span className="text-xl font-bold">{ats.score}/100</span>
        </div>

        <div className="w-full bg-gray-200 dark:bg-gray-800 h-2 rounded-full mb-4">
          <div
            className={`${getScoreColor(ats.score)} h-2 rounded-full`}
            style={{ width: `${ats.score}%` }}
          />
        </div>

        <p className="text-sm text-gray-600 mb-3">
          {ats.score >= 80
            ? "Excellent ATS compatibility"
            : ats.score >= 60
            ? "Good, but can be improved"
            : "Low ATS score — improvements recommended"}
        </p>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <p>Structure: {ats.breakdown.structure}/30</p>
          <p>Keywords: {ats.breakdown.keywords}/30</p>
          <p>Bullets: {ats.breakdown.bullets}/20</p>
          <p>Readability: {ats.breakdown.readability}/20</p>
        </div>

        {ats.warnings.length > 0 && (
          <div className="mt-4">
            <p className="font-semibold text-sm mb-2 text-red-600">
              Improvement Suggestions
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
              {ats.warnings.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </div>
        )}
      </Card>

      {/* Extraction Method Toggle */}
      <div className="flex space-x-2">
        <Button
          variant={extractionMethod === "file" ? "default" : "outline"}
          onClick={() => setExtractionMethod("file")}
        >
          <Upload className="w-4 h-4 mr-1" />
          Upload File
        </Button>
        <Button
          variant={extractionMethod === "text" ? "default" : "outline"}
          onClick={() => setExtractionMethod("text")}
        >
          <Type className="w-4 h-4 mr-1" />
          Paste Text
        </Button>
      </div>

      {/* File Upload */}
      {extractionMethod === "file" && (
        <div className="p-4 border-2 border-dashed rounded-lg text-center">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isExtracting}
          >
            {isExtracting ? "Extracting..." : "Upload Resume"}
          </Button>

          {uploadedFile && (
            <div className="flex items-center justify-center mt-2 text-sm">
              <FileText className="w-4 h-4 mr-1" />
              {uploadedFile.name}
            </div>
          )}
        </div>
      )}

      {/* Text Extraction */}
      {extractionMethod === "text" && (
        <div className="space-y-3">
          <Textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume text here..."
            className="min-h-[200px]"
          />
          <Button
            variant="outline"
            onClick={handleTextExtraction}
            disabled={isExtracting || !resumeText.trim()}
          >
            Extract Resume Data
          </Button>
        </div>
      )}

      {/* AI Actions */}
      <div className="flex space-x-4">
        <Button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
        </Button>

        <Button
          onClick={handleEnhance}
          disabled={isEnhancing}
          variant="outline"
          className="border-purple-600 text-purple-600"
        >
          {isEnhancing ? "Enhancing..." : "Enhance with AI"}
        </Button>
      </div>

      {/* AI RESULTS */}
      {analysis && (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-green-700 mb-2">Strengths</h4>
            <div className="flex flex-wrap gap-2">
              {analysis.strengths.map((s, i) => (
                <Badge key={i} className="bg-green-100 text-green-800">
                  {s}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-orange-700 mb-2">
              Areas for Improvement
            </h4>
            <div className="flex flex-wrap gap-2">
              {analysis.improvements.map((i, idx) => (
                <Badge key={idx} className="bg-orange-100 text-orange-800">
                  {i}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-blue-700 mb-2">AI Suggestions</h4>
            <div className="space-y-2">
              {analysis.suggestions.map((s, i) => (
                <div key={i} className="p-3 bg-blue-50 rounded-lg">
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ResumeAnalysisComponent;
