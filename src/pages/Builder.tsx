import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, ArrowLeft, ArrowRight, Bot, Home, LayoutTemplate } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import PersonalInfoForm from "@/components/resume/PersonalInfoForm";
import EducationForm from "@/components/resume/EducationForm";
import ExperienceForm from "@/components/resume/ExperienceForm";
import SkillsForm from "@/components/resume/SkillsForm";
import ResumePreview from "@/components/resume/ResumePreview";
import ResumeAnalysisComponent from "@/components/resume/ResumeAnalysis";
import ResumeGenerator from "@/components/resume/ResumeGenerator";
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

  const slideVariants = {
    initial: { opacity: 0, x: 50 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -50 }
  };

  const slideTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4
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
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                urCV.ai
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-950/30 rounded-full"
              >
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  Step {currentStep + 1} of {steps.length}
                </span>
              </motion.div>
              <ThemeToggle />
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
      </motion.nav>

      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="container mx-auto px-4 py-6"
      >
        <div className="max-w-md mx-auto">
          <div className="flex justify-between mb-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  animate={{
                    scale: currentStep === index ? 1.1 : 1,
                    backgroundColor: index <= currentStep 
                      ? "rgb(37, 99, 235)" 
                      : "rgb(229, 231, 235)"
                  }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                    index <= currentStep 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50" 
                      : "bg-gray-300 dark:bg-gray-700 text-gray-500"
                  }`}
                >
                  {index < currentStep ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <CheckCircle className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <span className="text-xs font-bold">{index + 1}</span>
                  )}
                </motion.div>
                <span className="text-xs text-gray-600 dark:text-gray-400 hidden sm:block">
                  {step.title}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="relative h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
            />
            {/* Shimmer effect */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
          </div>
        </div>
      </motion.div>

      
      <div className="container mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          
          <Card className="lg:col-span-2 p-6 shadow-md border-0 dark:bg-gray-900 dark:border-gray-800 animate-slide-in-left">
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
                    Resume Form
                  </TabsTrigger>
                  <TabsTrigger 
                    value="analysis" 
                    className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-md transition-all duration-300"
                  >
                    <Bot className="w-4 h-4 mr-2" />
                    AI Analysis
                  </TabsTrigger>
                  <TabsTrigger 
                    value="generate" 
                    className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-md transition-all duration-300"
                  >
                    Generate
                  </TabsTrigger>
                </TabsList>

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

                      <CurrentStepComponent
                        data={resumeData}
                        updateData={updateResumeData}
                      />

                      {/* Navigation Buttons */}
                      <div className="flex justify-between mt-8">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            variant="outline"
                            onClick={handlePrevious}
                            disabled={currentStep === 0}
                            className="flex items-center space-x-2 disabled:opacity-50 border-2"
                          >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Previous</span>
                          </Button>
                        </motion.div>

          
          <Card className="shadow-md border-0 animate-slide-in-right overflow-hidden flex flex-col h-full bg-gray-100">
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
                    <ResumeAnalysisComponent
                      data={resumeData}
                      onEnhance={handleEnhanceResume}
                      onExtractedData={handleExtractedData}
                    />
                  </motion.div>
                </TabsContent>

                <TabsContent value="generate">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
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
              <div className="flex-1 overflow-auto bg-gray-200 dark:bg-gray-950 p-4 min-h-[600px] flex justify-center">
                <motion.div 
                  key={templateName}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className={`w-full ${templateName === 'creative' ? 'max-w-full' : 'max-w-[800px]'} bg-white dark:bg-gray-900 shadow-2xl`}
                >
                  <ResumePreview data={resumeData} templateName={templateName} />
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      
      <FloatingChatBot />

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