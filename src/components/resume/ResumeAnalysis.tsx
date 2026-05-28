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
import { Bot, Upload, FileText, Type, Copy, Check, X, Sparkles, ClipboardPaste } from "lucide-react";

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
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  // Ref attached to the results section for auto-scroll
  const resultsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  /* ---------------- ATS ANALYSIS (RULE-BASED) ---------------- */
  const ats = useMemo(() => analyzeATS(data), [data]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  /* ---------------- COPY TO CLIPBOARD ---------------- */
  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      toast({
        title: "Copy Failed",
        description: "Could not copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  /* ---------------- RESET ANALYSIS ---------------- */
  const handleReset = () => {
    setAnalysis(null);
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
      // Auto-scroll to results after state update renders
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
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
      const normalizedData = {
        ...extractedData,
        personalInfo: {
          ...extractedData.personalInfo,
          portfolio: extractedData.personalInfo.portfolio || "",
        },
      };
      onExtractedData(normalizedData);

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

      {/* ── POLISHED IMPORT DATA SECTION ── */}
      <div className="rounded-xl border border-dashed border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/20 p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-500" />
          <p className="font-semibold text-blue-800 dark:text-blue-300 text-sm">
            Import Your Existing Resume
          </p>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 -mt-2">
          Upload a file or paste text — AI will auto-fill all your resume fields instantly.
        </p>

        {/* Extraction Method Toggle */}
        <div className="flex space-x-2">
          <Button
            variant={extractionMethod === "file" ? "default" : "outline"}
            size="sm"
            onClick={() => setExtractionMethod("file")}
          >
            <Upload className="w-4 h-4 mr-1" />
            Upload File
          </Button>
          <Button
            variant={extractionMethod === "text" ? "default" : "outline"}
            size="sm"
            onClick={() => setExtractionMethod("text")}
          >
            <ClipboardPaste className="w-4 h-4 mr-1" />
            Paste Text
          </Button>
        </div>

        {/* File Upload */}
        {extractionMethod === "file" && (
          <div className="p-4 border-2 border-dashed border-blue-200 dark:border-blue-800 rounded-lg text-center bg-white dark:bg-gray-900">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Upload className="w-8 h-8 mx-auto mb-2 text-blue-400" />
            <p className="text-sm text-gray-500 mb-2">PDF, DOC, DOCX or TXT</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isExtracting}
            >
              {isExtracting ? "Extracting..." : "Choose File"}
            </Button>

            {uploadedFile && (
              <div className="flex items-center justify-center mt-2 text-sm text-gray-600">
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
              placeholder="Paste your full resume text here and we'll extract all your information automatically..."
              className="min-h-[160px] text-sm bg-white dark:bg-gray-900"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleTextExtraction}
              disabled={isExtracting || !resumeText.trim()}
            >
              {isExtracting ? "Extracting..." : "Extract Resume Data"}
            </Button>
          </div>
        )}
      </div>

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
        <div ref={resultsRef} className="space-y-6 scroll-mt-4">

          {/* Reset Button */}
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300">Analysis Results</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
            >
              <X className="w-4 h-4 mr-1" />
              Clear Results
            </Button>
          </div>

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
              {analysis.improvements.map((item, idx) => (
                <Badge key={idx} className="bg-orange-100 text-orange-800">
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-blue-700 mb-2">AI Suggestions</h4>
            <div className="space-y-2">
              {analysis.suggestions.map((s, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between gap-3 p-3 bg-blue-50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-200 rounded-lg group"
                >
                  <span className="text-sm leading-relaxed">{s}</span>
                  {/* Copy Button */}
                  <button
                    onClick={() => handleCopy(s, i)}
                    title="Copy suggestion"
                    className="shrink-0 mt-0.5 p-1 rounded hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-400 hover:text-blue-700 dark:hover:text-blue-200 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    {copiedIndex === i ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
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