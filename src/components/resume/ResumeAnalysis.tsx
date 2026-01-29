import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { analyzeResume, enhanceResume, extractResumeDataWithAI, ResumeAnalysis } from '@/services/groqService';
import { parseResumeFile } from '@/services/fileParserService';
import { ResumeData } from '@/pages/Builder';
import { useToast } from '@/hooks/use-toast';
import { Bot, Upload, FileText, Type, Sparkles, Activity, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';
import ATSScoreAnalyzer from './ATSScoreAnalyzer';

interface ResumeAnalysisProps {
  data: ResumeData;
  onEnhance: (enhancedData: ResumeData) => void;
  onExtractedData: (extractedData: ResumeData) => void;
}

const ResumeAnalysisComponent = ({ data, onEnhance, onExtractedData }: ResumeAnalysisProps) => {
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState('');
  const [extractionMethod, setExtractionMethod] = useState<'file' | 'text'>('file');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeResume(data);
      setAnalysis(result);
      toast({
        title: "Analysis Complete",
        description: "Your resume has been analyzed successfully!",
      });
    } catch (error) {
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
    } catch (error) {
      toast({
        title: "Enhancement Failed",
        description: "Failed to enhance resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
    } catch (error) {
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
    } catch (error) {
      toast({
        title: "Extraction Failed",
        description: "Failed to extract resume data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExtracting(false);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="p-0 overflow-hidden border-0 shadow-none bg-transparent">
      <Tabs defaultValue="ats" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="ats" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            ATS Score
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            AI Deep Dive
          </TabsTrigger>
          <TabsTrigger value="import" className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Import
          </TabsTrigger>
        </TabsList>

        {/* ATS SCORE CONTENT */}
        <TabsContent value="ats" className="m-0 focus-visible:ring-0">
          <ATSScoreAnalyzer data={data} />
        </TabsContent>

        {/* AI ANALYSIS CONTENT */}
        <TabsContent value="ai" className="m-0 focus-visible:ring-0">
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center p-8 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30 text-center">
              <Bot className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Advanced AI Deep Dive</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
                Get personalized suggestions, alternate phrasing, and professional skill gaps analysis using GPT models.
              </p>
              <div className="flex gap-4">
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="bg-blue-600 hover:bg-blue-700 font-semibold"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Run AI Analysis'}
                </Button>
                <Button
                  onClick={handleEnhance}
                  disabled={isEnhancing}
                  variant="outline"
                  className="border-purple-600 text-purple-600 hover:bg-purple-50"
                >
                  {isEnhancing ? 'Enhancing...' : 'Auto-Enhance Resume'}
                </Button>
              </div>
            </div>

            {analysis && (
              <div className="space-y-6 animate-fade-in">
                {/* Score */}
                <div className="text-center">
                  <div className={`w-20 h-20 rounded-full ${getScoreColor(analysis.score)} flex items-center justify-center mx-auto mb-2 shadow-lg`}>
                    <span className="text-white text-xl font-bold">{analysis.score}</span>
                  </div>
                  <p className="text-gray-600 font-medium">AI Quality Score</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Strengths */}
                  <Card className="p-4 bg-green-50/50 dark:bg-green-900/10 border-green-100 dark:border-green-900/30">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      AI-Detected Strengths
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.strengths.map((strength, index) => (
                        <Badge key={index} variant="secondary" className="bg-green-100 text-green-800 border-none">
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </Card>

                  {/* Improvements */}
                  <Card className="p-4 bg-orange-50/50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-900/30">
                    <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Areas for Improvement
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.improvements.map((improvement, index) => (
                        <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-800 border-none">
                          {improvement}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </div>

                {/* Suggestions */}
                <Card className="p-4 border-dashed">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Strategic AI Recommendations
                  </h4>
                  <div className="grid gap-3">
                    {analysis.suggestions.map((suggestion, index) => (
                      <div key={index} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex gap-3 items-start">
                        <Lightbulb className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                        <p className="text-sm text-blue-800 dark:text-blue-300">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}
          </div>
        </TabsContent>

        {/* IMPORT CONTENT */}
        <TabsContent value="import" className="m-0 focus-visible:ring-0">
          <div className="space-y-6">
            {/* Extraction Method Toggle */}
            <div className="flex justify-center">
              <div className="inline-flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <Button
                  variant={extractionMethod === 'file' ? 'default' : 'ghost'}
                  onClick={() => setExtractionMethod('file')}
                  className="flex items-center space-x-2 text-sm h-9"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload File</span>
                </Button>
                <Button
                  variant={extractionMethod === 'text' ? 'default' : 'ghost'}
                  onClick={() => setExtractionMethod('text')}
                  className="flex items-center space-x-2 text-sm h-9"
                >
                  <Type className="w-4 h-4" />
                  <span>Paste Text</span>
                </Button>
              </div>
            </div>

            {/* File Upload Section */}
            {extractionMethod === 'file' && (
              <div className="p-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl bg-gray-50/50 dark:bg-gray-900/50">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Upload your resume</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-xs mx-auto">
                    We'll use AI to parse your existing resume and fill into the builder automatically.
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.txt,image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button
                    onClick={triggerFileUpload}
                    disabled={isExtracting}
                    className="bg-blue-600 hover:bg-blue-700 min-w-[160px]"
                  >
                    {isExtracting ? 'Parsing...' : 'Select PDF/Word'}
                  </Button>
                  {uploadedFile && (
                    <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-blue-600">
                      <FileText className="w-4 h-4" />
                      <span className="font-medium">{uploadedFile.name}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Text Input Section */}
            {extractionMethod === 'text' && (
              <div className="space-y-4">
                <Textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your complete resume text here..."
                  className="min-h-[300px] w-full rounded-xl"
                  disabled={isExtracting}
                />
                <Button
                  onClick={handleTextExtraction}
                  disabled={isExtracting || !resumeText.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-700 h-12 font-bold"
                >
                  {isExtracting ? 'Extracting Data...' : 'Extract & Fill Form'}
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ResumeAnalysisComponent;

