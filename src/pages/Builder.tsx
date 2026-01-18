import { useState, useEffect } from "react"; // Added useEffect
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, ArrowLeft, ArrowRight, Bot, Home, LayoutTemplate } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import PersonalInfoForm from "@/components/resume/PersonalInfoForm";
import EducationForm from "@/components/resume/EducationForm";
import ExperienceForm from "@/components/resume/ExperienceForm";
import SkillsForm from "@/components/resume/SkillsForm";
import ResumePreview from "@/components/resume/ResumePreview";
import ResumeAnalysisComponent from "@/components/resume/ResumeAnalysis";
import ResumeGenerator from "@/components/resume/ResumeGenerator";
import FullPreviewModal from "@/components/resume/FullPreviewModal";
import FloatingChatBot from "@/components/FloatingChatBot";
import CodingProfilesForm from "@/components/resume/CodingProfilesForm";
import HobbiesForm from "@/components/resume/HobbiesForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ResumeDownloadOptions } from "@/components/resume/ResumeGenerator";

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    portfolio: string; 
    summary: string;
    photoUrl: string
  };
  education: Array<{
    id: string;
    degree: string;
    school: string;
    location: string;
    graduationDate: string;
    gpa?: string;
  }>;
  experience: Array<{
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;
  skills: {
    technical: string[];
    languages: string[];
    certifications: string[];
  };
  hobbies?: string[];
  codingProfiles: {
    github?: string;
    leetcode?: string;
    hackerrank?: string;
    codeforces?: string;
    kaggle?: string;
    codechef?: string;
  };
  
}

const Builder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: "Alex Morgan",
      email: "alex.morgan@example.com",
      phone: "+1 (555) 012-3456",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/alexmorgan",
      portfolio: "alexmorgan.com",
      summary: "Innovative and results-oriented professional with a strong background in technology and design. Skilled in project management, team leadership, and creative problem-solving. Committed to delivering high-quality solutions and driving business growth.",
      photoUrl: ""
    },
    education: [
      {
        id: "1",
        degree: "Bachelor of Science in Computer Science",
        school: "University of Technology",
        location: "San Francisco, CA",
        graduationDate: "May 2022",
        gpa: "3.8"
      }
    ],
    experience: [
      {
        id: "1",
        title: "Senior Developer",
        company: "Tech Solutions Inc.",
        location: "San Francisco, CA",
        startDate: "Jun 2022",
        endDate: "Present",
        current: true,
        description: "Led a team of developers in building scalable web applications. Implemented new features and optimized existing code for better performance."
      }
    ],
    skills: {
      technical: ["React", "TypeScript", "Node.js", "AWS"],
      languages: ["English (Native)", "Spanish (Intermediate)"],
      certifications: ["AWS Certified Solutions Architect"],
    },
    
    hobbies: [],

    codingProfiles: {
      github: "",
      leetcode: "",
      hackerrank: "",
      codeforces: "",
      kaggle: "",
      codechef: ""
    },
  });

  const [templateName, setTemplateName] = useState<'default' | 'modern' | 'professional' | 'creative' | 'minimalist' | 'bold'>('default');
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showFullPreview, setShowFullPreview] = useState(false);
  
  // Mobile state for preview visibility
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Desktop sliding window state - only used on desktop
  const [leftWidth, setLeftWidth] = useState(60); // percentage
  const [isResizing, setIsResizing] = useState(false);

  const startResize = () => setIsResizing(true);
  const stopResize = () => setIsResizing(false);

  const handleResize = (e: MouseEvent) => {
    if (!isResizing || e.buttons !== 1) return;

    const newWidth = (e.clientX / window.innerWidth) * 100;
    if (newWidth > 30 && newWidth < 75) {
      setLeftWidth(newWidth);
    }
  };

  if (isResizing) {
    window.addEventListener("mousemove", handleResize);
    window.addEventListener("mouseup", stopResize);
  } else {
    window.removeEventListener("mousemove", handleResize);
    window.removeEventListener("mouseup", stopResize);
  }

  const steps = [
    { title: "Personal Info", component: PersonalInfoForm },
    { title: "Education", component: EducationForm },
    { title: "Experience", component: ExperienceForm },
    { title: "Skills", component: SkillsForm },
    { title: "Hobbies", component: HobbiesForm },
    { title: "Coding Profiles", component: CodingProfilesForm },
  ];

  const CurrentStepComponent = steps[currentStep].component;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleEnhanceResume = (enhancedData: ResumeData) => {
    setResumeData(enhancedData);
  };

  const getResumeContext = () => {
    return `Current resume data: ${JSON.stringify(resumeData, null, 2)}`;
  };

  const handleExtractedData = (extractedData: ResumeData) => {
    setResumeData(extractedData);
  };

  const completedSteps = currentStep;
  const remainingSteps = steps.length - currentStep - 1;
  const nextSectionTitle = steps[currentStep + 1]?.title ?? "Preview & Generate";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 animate-fade-in">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8  rounded-lg flex items-center justify-center">
                <img alt="website" src="./websitelogo.png"/>
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              urCV.ai
            </span>
          </Link>
          <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-4 text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Step {currentStep + 1} of {steps.length}
            </span>
            <ThemeToggle />
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                asChild
              >
                <Link to="/" aria-label="Back to main page" className="flex items-center gap-1">
                  <Home className="w-4 h-4" />
                  <span>Back Home</span>
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-blue-200 text-blue-600 hover:text-white hover:bg-blue-600 dark:border-blue-800 dark:text-blue-300"
                asChild
              >
                <Link to="/templates" aria-label="Go to templates page" className="flex items-center gap-1">
                  <LayoutTemplate className="w-4 h-4" />
                  <span>Templates</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="container mx-auto px-4 mb-8 animate-fade-in">
        <div className="bg-gray-200 dark:bg-gray-800 rounded-full h-2 max-w-md mx-auto">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Mobile Preview Toggle Button - Only on mobile */}
      {isMobile && (
        <div className="container mx-auto px-4 mb-4">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => setShowMobilePreview(!showMobilePreview)}
          >
            <FileText className="w-4 h-4" />
            {showMobilePreview ? "Hide Preview" : "Show Preview"}
            <ArrowRight className={`w-4 h-4 transition-transform ${showMobilePreview ? 'rotate-90' : ''}`} />
          </Button>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8">
        {/* Mobile Layout - Stacked */}
        {isMobile ? (
          <div className="flex flex-col gap-4">
            {/* Form Section - Always visible on mobile */}
            <Card className="p-4 shadow-md border-0 dark:bg-gray-900 dark:border-gray-800">
              <Tabs defaultValue="form" className="w-full">
                <TabsList className="grid w-full grid-cols-3 transition-all duration-300 dark:bg-gray-800">
                  <TabsTrigger value="form" className="transition-all duration-200 hover:scale-105 dark:data-[state=active]:bg-gray-700">Form</TabsTrigger>
                  <TabsTrigger value="analysis" className="transition-all duration-200 hover:scale-105 dark:data-[state=active]:bg-gray-700">
                    <Bot className="w-4 h-4 mr-2" />
                    AI
                  </TabsTrigger>
                  <TabsTrigger value="generate" className="transition-all duration-200 hover:scale-105 dark:data-[state=active]:bg-gray-700">Generate</TabsTrigger>
                </TabsList>

                <TabsContent value="form" className="mt-4">
                  <div className="mb-4 animate-fade-in">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {steps[currentStep].title}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Fill in your {steps[currentStep].title.toLowerCase()} details
                    </p>
                  </div>

                  <div className="transition-all duration-400 ease-in-out">
                    <CurrentStepComponent
                      data={resumeData}
                      updateData={updateResumeData}
                    />
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex flex-col gap-4 mt-6 sm:flex-row sm:items-center sm:justify-between">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentStep === 0}
                      className="flex items-center space-x-2 transition-all duration-200 hover:scale-105 disabled:opacity-50"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </Button>

                    {currentStep === steps.length - 1 ? (
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2 transition-all duration-200 hover:scale-105 hover:shadow-lg" onClick={() => setShowGenerateModal(true)}>
                        <span>Generate Resume</span>
                      </Button>
                    ) : (
                      <Button
                        onClick={handleNext}
                        className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2 transition-all duration-200 hover:scale-105 hover:shadow-lg"
                      >
                        <span>Next</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="mt-6 grid gap-4">
                    <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 text-white p-4 shadow-xl border border-white/10">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/70">Builder pulse</p>
                      <h3 className="mt-2 text-xl font-semibold">
                        {completedSteps+1} / {steps.length} sections complete
                      </h3>
                      <p className="mt-2 text-sm text-white/80">
                        {remainingSteps >= 0
                          ? `Next up: ${nextSectionTitle}`
                          : "All sections complete!"}
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="analysis" className="mt-4 animate-fade-in">
                  <ResumeAnalysisComponent
                    data={resumeData}
                    onEnhance={handleEnhanceResume}
                    onExtractedData={handleExtractedData}
                  />
                </TabsContent>

                <TabsContent value="generate" className="mt-4 animate-fade-in">
                  <ResumeGenerator data={resumeData} templateName={templateName} />
                </TabsContent>
              </Tabs>
            </Card>

            {/* Preview Section - Conditionally shown on mobile */}
            {showMobilePreview && (
              <Card className="shadow-md border-0 overflow-hidden flex flex-col">
                <div className="p-4 bg-white border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Preview</h2>
                  <div className="mb-2">
                    <label className="block text-xs font-medium text-gray-700 mb-2">Choose Template</label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant={templateName === 'default' ? 'default' : 'outline'}
                        className="text-[10px] h-8 px-2"
                        onClick={() => setTemplateName('default')}
                      >
                        Default
                      </Button>
                      <Button
                        variant={templateName === 'modern' ? 'default' : 'outline'}
                        className="text-[10px] h-8 px-2"
                        onClick={() => setTemplateName('modern')}
                      >
                        Modern
                      </Button>
                      <Button
                        variant={templateName === 'professional' ? 'default' : 'outline'}
                        className="text-[10px] h-8 px-2"
                        onClick={() => setTemplateName('professional')}
                      >
                        Pro
                      </Button>
                      <Button
                        variant={templateName === 'creative' ? 'default' : 'outline'}
                        className="text-[10px] h-8 px-2"
                        onClick={() => setTemplateName('creative')}
                      >
                        Creative
                      </Button>
                      <Button
                        variant={templateName === 'minimalist' ? 'default' : 'outline'}
                        className="text-[10px] h-8 px-2"
                        onClick={() => setTemplateName('minimalist')}
                      >
                        Minimal
                      </Button>
                      <Button
                        variant={templateName === 'bold' ? 'default' : 'outline'}
                        className="text-[10px] h-8 px-2"
                        onClick={() => setTemplateName('bold')}
                      >
                        Bold
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex-1 overflow-auto bg-gray-200 p-4 min-h-[400px] flex justify-center">
                  <div className={`w-full ${templateName === 'creative' ? 'max-w-full' : 'max-w-[800px]'} bg-white shadow-xl transition-all duration-300 ease-in-out`}>
                    <ResumePreview data={resumeData} templateName={templateName} />
                  </div>
                </div>
              </Card>
            )}
          </div>
        ) : (
          /* Desktop Layout - Side by Side with Resizer */
          <div className="flex gap-0 max-w-full mx-auto relative">
            {/* Form Section */}
            <Card
              style={{ width: `${leftWidth}%` }}
              className="p-6 shadow-md border-0 dark:bg-gray-900 dark:border-gray-800 animate-slide-in-left transition-none"
            >
              <Tabs defaultValue="form" className="w-full">
                <TabsList className="grid w-full grid-cols-3 transition-all duration-300 dark:bg-gray-800">
                  <TabsTrigger value="form" className="transition-all duration-200 hover:scale-105 dark:data-[state=active]:bg-gray-700">Resume Form</TabsTrigger>
                  <TabsTrigger value="analysis" className="transition-all duration-200 hover:scale-105 dark:data-[state=active]:bg-gray-700">
                    <Bot className="w-4 h-4 mr-2" />
                    AI Analysis
                  </TabsTrigger>
                  <TabsTrigger value="generate" className="transition-all duration-200 hover:scale-105 dark:data-[state=active]:bg-gray-700">Generate</TabsTrigger>
                </TabsList>

                <TabsContent value="form" className="mt-6">
                  <div className="mb-6 animate-fade-in">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {steps[currentStep].title}
                    </h2>
                    <p className="text-gray-600">
                      Fill in your {steps[currentStep].title.toLowerCase()} details
                    </p>
                  </div>

                  <div className="transition-all duration-400 ease-in-out">
                    <CurrentStepComponent
                      data={resumeData}
                      updateData={updateResumeData}
                    />
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex flex-col gap-4 mt-8 sm:flex-row sm:items-center sm:justify-between">
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      disabled={currentStep === 0}
                      className="flex items-center space-x-2 transition-all duration-200 hover:scale-105 disabled:opacity-50"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </Button>

                    {currentStep === steps.length - 1 ? (
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2 transition-all duration-200 hover:scale-105 hover:shadow-lg" onClick={() => setShowGenerateModal(true)}>
                        <span>Generate Resume</span>
                      </Button>
                    ) : (
                      <Button
                        onClick={handleNext}
                        className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2 transition-all duration-200 hover:scale-105 hover:shadow-lg"
                      >
                        <span>Next</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="mt-6 grid gap-4 lg:grid-cols-2">
                    <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 text-white p-6 shadow-xl border border-white/10">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/70">Builder pulse</p>
                      <h3 className="mt-2 text-2xl font-semibold">
                        {completedSteps+1} / {steps.length} sections complete
                      </h3>
                      <p className="mt-3 text-sm text-white/80">
                        {remainingSteps >= 0
                          ? `You're fine-tuning the ${steps[currentStep].title} section. Next up: ${nextSectionTitle}.`
                          : "All sections complete — polish your summary and hit generate!"}
                      </p>
                    </div>
                    <Card className="p-5 border-dashed border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Quick polish checklist</p>
                      <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-300 list-disc list-inside">
                        <li>Lead bullets with strong action verbs.</li>
                        <li>Back wins with data (e.g. "Cut costs by 12%" ).</li>
                        <li>Keep sentences under two lines for readability.</li>
                      </ul>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="analysis" className="mt-6 animate-fade-in">
                  <ResumeAnalysisComponent
                    data={resumeData}
                    onEnhance={handleEnhanceResume}
                    onExtractedData={handleExtractedData}
                  />
                </TabsContent>

                <TabsContent value="generate" className="mt-6 animate-fade-in">
                  <ResumeGenerator data={resumeData} templateName={templateName} />
                </TabsContent>
              </Tabs>
            </Card>

            {/* Resizer - Desktop Only */}
            <div
              onMouseDown={startResize}
              onDoubleClick={(e) => e.preventDefault()}
              className="w-2 cursor-col-resize bg-gray-300 dark:bg-gray-700 hover:bg-blue-500 transition-colors select-none hidden md:block"
              style={{ userSelect: "none" }}
            />

            {/* Preview Section */}
            <Card
              style={{ width: `${100 - leftWidth}%` }}
              className="shadow-md border-0 animate-slide-in-right overflow-hidden flex flex-col h-screen bg-gray-100 transition-none hidden md:flex"
            >
              <div className="p-4 bg-white border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Design & Preview</h2>
                <div className="mb-2">
                  <label className="block text-xs font-medium text-gray-700 mb-2">Choose Template</label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant={templateName === 'default' ? 'default' : 'outline'}
                      className="text-[10px] h-8 px-2"
                      onClick={() => setTemplateName('default')}
                    >
                      Default
                    </Button>
                    <Button
                      variant={templateName === 'modern' ? 'default' : 'outline'}
                      className="text-[10px] h-8 px-2"
                      onClick={() => setTemplateName('modern')}
                    >
                      Modern
                    </Button>
                    <Button
                      variant={templateName === 'professional' ? 'default' : 'outline'}
                      className="text-[10px] h-8 px-2"
                      onClick={() => setTemplateName('professional')}
                    >
                      Pro
                    </Button>
                    <Button
                      variant={templateName === 'creative' ? 'default' : 'outline'}
                      className="text-[10px] h-8 px-2"
                      onClick={() => setTemplateName('creative')}
                    >
                      Creative
                    </Button>
                    <Button
                      variant={templateName === 'minimalist' ? 'default' : 'outline'}
                      className="text-[10px] h-8 px-2"
                      onClick={() => setTemplateName('minimalist')}
                    >
                      Minimal
                    </Button>
                    <Button
                      variant={templateName === 'bold' ? 'default' : 'outline'}
                      className="text-[10px] h-8 px-2"
                      onClick={() => setTemplateName('bold')}
                    >
                      Bold
                    </Button>
                  </div>
                </div>
                <div className="mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFullPreview(true)}
                    className="w-full flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 hover:text-blue-800"
                  >
                    <FileText className="w-4 h-4" />
                    View Full Preview
                  </Button>
                </div>
              </div>
              <div className="flex-1 overflow-auto bg-gray-200 p-4 min-h-[600px] flex justify-center">
                <div className={`w-full ${templateName === 'creative' ? 'max-w-full' : 'max-w-[800px]'} bg-white shadow-xl transition-all duration-300 ease-in-out`}>
                  <ResumePreview data={resumeData} templateName={templateName} />
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Floating Chat Bot */}
      <FloatingChatBot />

      {/* Full Preview Modal */}
      <FullPreviewModal
        isOpen={showFullPreview}
        onClose={() => setShowFullPreview(false)}
        data={resumeData}
        templateName={templateName}
      />

      {/* Generate Modal */}
      <Dialog open={showGenerateModal} onOpenChange={setShowGenerateModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Export your resume</DialogTitle>
          </DialogHeader>
          <ResumeDownloadOptions data={resumeData} templateName={templateName} showHeading={false} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Builder;