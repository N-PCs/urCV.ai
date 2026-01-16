import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, ArrowLeft, ArrowRight, Bot } from "lucide-react";
import { Link } from "react-router-dom";
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

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    summary: string;
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
      summary: "Innovative and results-oriented professional with a strong background in technology and design. Skilled in project management, team leadership, and creative problem-solving. Committed to delivering high-quality solutions and driving business growth.",
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

    codingProfiles: {
      github: "",
      leetcode: ""
    },
  });

  const [templateName, setTemplateName] = useState<'default' | 'modern' | 'professional' | 'creative'>('default');

  const steps = [
    { title: "Personal Info", component: PersonalInfoForm },
    { title: "Education", component: EducationForm },
    { title: "Experience", component: ExperienceForm },
    { title: "Skills", component: SkillsForm },
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8  rounded-lg flex items-center justify-center">
                <img alt="website" src="./websitelogo.png"/>
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              urCV.ai
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 dark:text-gray-400">Step {currentStep + 1} of {steps.length}</span>
            <ThemeToggle />
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

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Form Section */}
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
                <div className="flex justify-between mt-8">
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
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2 transition-all duration-200 hover:scale-105 hover:shadow-lg">
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

          {/* Preview Section */}
          {/* Preview Section */}
          <Card className="shadow-md border-0 animate-slide-in-right overflow-hidden flex flex-col h-full bg-gray-100">
            <div className="p-4 bg-white border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Design & Preview</h2>
              <div className="mb-2">
                <label className="block text-xs font-medium text-gray-700 mb-2">Choose Template</label>
                <div className="grid grid-cols-4 gap-2">
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
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-auto bg-gray-200 p-4 min-h-[600px] flex justify-center">
              <div className={`w-full ${templateName === 'creative' ? 'max-w-full' : 'max-w-[800px]'} bg-white shadow-xl transition-all duration-300 ease-in-out`}>
                <ResumePreview data={resumeData} templateName={templateName} />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Floating Chat Bot */}
      <FloatingChatBot />
    </div>
  );
};

export default Builder;
