import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, User, Edit, MessageSquare, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/layout/Footer";
import LogoLoop from "@/components/LogoLoop";
import ResumeTipsSection from "@/components/resume/ResumeTipsSection";
import { GridScan } from "@/components/GridScan";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiVite,
  SiVercel,
  SiFigma,
  SiGithub,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGooglecloud,
  SiFirebase,
} from "react-icons/si";

// Create a larger array of logos for better animation
const techLogos = [
  {
    node: <SiReact className="text-[#61DAFB]" size={48} />,
    title: "React",
    href: "https://react.dev",
  },
  {
    node: <SiNextdotjs className="text-white" size={48} />,
    title: "Next.js",
    href: "https://nextjs.org",
  },
  {
    node: <SiTypescript className="text-[#3178C6]" size={48} />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: <SiTailwindcss className="text-[#06B6D4]" size={48} />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
  {
    node: <SiVite className="text-[#646CFF]" size={48} />,
    title: "Vite",
    href: "https://vitejs.dev",
  },
  {
    node: <SiVercel className="text-white" size={48} />,
    title: "Vercel",
    href: "https://vercel.com",
  },
  {
    node: <SiFigma className="text-[#F24E1E]" size={48} />,
    title: "Figma",
    href: "https://figma.com",
  },
  {
    node: <SiGithub className="text-white" size={48} />,
    title: "GitHub",
    href: "https://github.com",
  },
  {
    node: <SiNodedotjs className="text-[#339933]" size={48} />,
    title: "Node.js",
    href: "https://nodejs.org",
  },
  {
    node: <SiExpress className="text-white" size={48} />,
    title: "Express",
    href: "https://expressjs.com",
  },
  {
    node: <SiMongodb className="text-[#47A248]" size={48} />,
    title: "MongoDB",
    href: "https://mongodb.com",
  },
  {
    node: <SiDocker className="text-[#2496ED]" size={48} />,
    title: "Docker",
    href: "https://docker.com",
  },
  {
    node: <SiGooglecloud className="text-white" size={48} />,
    title: "Google Cloud",
    href: "https://cloud.google.com",
  },
  {
    node: <SiFirebase className="text-[#FFCA28]" size={48} />,
    title: "Firebase",
    href: "https://firebase.google.com",
  },
];

import { useState } from "react";
import TestimonialsSection from "@/components/TestimonialsSection";
import ReviewForm from "@/components/ReviewForm";

const Index = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleReviewSubmitted = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 overflow-hidden font-sans transition-colors duration-300">
      {/* Navigation */}
      <nav className="border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <img alt="website img" src="./websitelogo.png"></img>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                urCV.ai
              </span>
            </div>
            
            {/* Desktop Navigation Buttons - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggle />
              <Link to="/interview-questions">
                <Button variant="outline" className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-green-600 dark:hover:border-green-400 hover:text-green-600 dark:hover:text-green-400 px-4 py-2 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md font-medium">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Interview Prep
                </Button>
              </Link>
              <Link to="/builder">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md font-medium">
                  Create Resume
                </Button>
              </Link>
            </div>
            
            {/* Mobile Menu Button - Visible only on mobile */}
            <div className="flex items-center space-x-4 md:hidden">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 relative w-10 h-10 rounded-lg transition-all duration-300"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {/* Menu Icon with rotation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Menu 
                    className={`w-6 h-6 transition-all duration-300 ease-out ${
                      mobileMenuOpen 
                        ? 'opacity-0 rotate-90 scale-0' 
                        : 'opacity-100 rotate-0 scale-100'
                    }`}
                  />
                  <X 
                    className={`w-6 h-6 absolute transition-all duration-300 ease-out ${
                      mobileMenuOpen 
                        ? 'opacity-100 rotate-0 scale-100' 
                        : 'opacity-0 -rotate-90 scale-0'
                    }`}
                  />
                </div>
              </Button>
            </div>
          </div>
          
          {/* Mobile Menu Dropdown - Only visible when mobileMenuOpen is true */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 animate-fade-in">
              <div className="flex flex-col space-y-3">
                <Link to="/builder" onClick={() => setMobileMenuOpen(false)}>
                  <Button 
                    className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-all duration-300 font-medium"
                  >
                    <FileText className="w-5 h-5 mr-3" />
                    Create Resume
                  </Button>
                </Link>
                <Link to="/interview-questions" onClick={() => setMobileMenuOpen(false)}>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-green-600 dark:hover:border-green-400 hover:text-green-600 dark:hover:text-green-400 px-4 py-3 rounded-lg transition-all duration-300 font-medium"
                  >
                    <MessageSquare className="w-5 h-5 mr-3" />
                    Interview Prep
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section with GridScan Background */}
      <div className="relative min-h-[85vh] bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-300 overflow-hidden ">
        {/* GridScan Background */}
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <div className="w-full h-full max-w-[1400px] mx-auto">
            <GridScan
              sensitivity={0.55}
              lineThickness={0}
              linesColor="rgba(0, 0, 0, 0.15)"
              gridScale={0.08}
              scanColor="#87CEEB"
              scanOpacity={1}
              enablePost
              bloomIntensity={1}
              chromaticAberration={0.001}
              noiseIntensity={1}
            />
          </div>

          {/* Dark mode GridScan overlay */}
          <div className="absolute inset-0">
            <GridScan
              sensitivity={0.55}
              lineThickness={0}
              linesColor="rgba(0, 0, 0, 0.15)"
              gridScale={0.08}
              scanColor="#87CEEB"
              scanOpacity={1}
              enablePost
              bloomIntensity={1}
              chromaticAberration={0.001}
              noiseIntensity={1}
              enableGyro={true}
            />
          </div>

          {/* Light mode GridScan overlay */}
          <div className="absolute inset-0 hidden dark:block">
            <GridScan
              sensitivity={0.55}
              lineThickness={0}
              linesColor="rgba(0, 0, 0, 0.15)"
              gridScale={0.08}
              scanColor="#87CEEB"
              scanOpacity={20}
              enablePost
              bloomIntensity={1}
              chromaticAberration={0.003}
              noiseIntensity={1}
              enableGyro={true}
            />
          </div>

          {/* Overlay gradients for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-50/90 via-transparent to-gray-50/80 dark:from-gray-900/95 dark:via-gray-900/90 dark:to-gray-900/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-900/20 dark:via-transparent dark:to-purple-900/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-gray-50/90 dark:to-gray-900/95" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-24 flex items-center min-h-[85vh] ">
          <div className="text-center max-w-4xl mx-auto w-full">
            <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold mb-6 animate-fade-in backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/50">
              New: AI-Powered Resume Analysis
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-1100 dark:text-white mb-6 leading-tight animate-fade-in">
              Build Your
              <span className="text-blue-600 dark:text-blue-400">
                {" "}
                Professional CV{" "}
              </span>
              in Minutes
            </h1>
            <p className="text-xl md:text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-delayed backdrop-blur-sm bg-white/40 dark:bg-black/40 p-6 rounded-2xl border border-white/20 dark:border-gray-800/50 shadow-lg">
              Create stunning, ATS-friendly resumes with our intelligent
              builder. Stand out from the crowd with professional templates
              designed by experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
              <Link to="/builder">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold text-lg backdrop-blur-sm border border-blue-700/50 hover:border-blue-800"
                >
                  Start Building Now
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Button>
              </Link>
              <Link to="/templates">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 px-8 py-6 rounded-xl transition-all duration-300 font-semibold text-lg backdrop-blur-sm bg-white/50 dark:bg-black/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/20"
                >
                  View Templates
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-24 dark:bg-gray-950 transition-colors duration-300">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose urCV.ai?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Experience the future of resume building with our AI-powered
            platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 dark:bg-gray-900 shadow-sm animate-slide-in-left group hover:border-blue-200 dark:hover:border-blue-800">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 dark:group-hover:bg-blue-600 transition-colors duration-300 group-hover:scale-110">
              <User className="w-8 h-8 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Smart Input Forms
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Intuitive forms that guide you through every section, ensuring you
              don't miss any important details
            </p>
          </Card>

          <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 dark:bg-gray-900 shadow-sm animate-fade-in animation-delay-200 group hover:border-blue-200 dark:hover:border-blue-800">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 dark:group-hover:bg-blue-600 transition-colors duration-300 group-hover:scale-110">
              <Edit className="w-8 h-8 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              AI Enhancement
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Our AI analyzes your experience and provides intelligent
              suggestions to improve impact and readability
            </p>
          </Card>

          <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 dark:bg-gray-900 shadow-sm animate-slide-in-right group hover:border-blue-200 dark:hover:border-blue-800">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 dark:group-hover:bg-blue-600 transition-colors duration-300 group-hover:scale-110">
              <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Professional Templates
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Beautiful, ATS-friendly templates designed by professionals to
              help you make the best impression
            </p>
          </Card>
        </div>
      </div>

      <ResumeTipsSection />

      <TestimonialsSection refreshTrigger={refreshTrigger} />
      <ReviewForm onReviewSubmitted={handleReviewSubmitted} />

      {/* CTA Section with Logo Loop */}
      <section className="relative overflow-hidden py-20 sm:py-24 animate-fade-in">
        {/* Layered background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950" />
        <div className="absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-28 left-8 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.18),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.14),transparent_55%)]" />

        <div className="relative container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold tracking-wide text-slate-200 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]" />
            Built for speed, accessibility, and great UX
          </div>

          <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            Built with Modern Technology
          </h2>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            A carefully picked stack that keeps the app fast, responsive, and
            easy to maintain.
          </p>

          <div className="mt-12 space-y-6">
            {/* Main Horizontal Logo Loop */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur-md shadow-[0_20px_80px_-40px_rgba(0,0,0,0.9)]">
              <LogoLoop
                logos={techLogos}
                speed={95}
                direction="left"
                width="100%"
                logoHeight={46}
                gap={52}
                fadeOut={true}
                fadeOutColor="#020617"
                scaleOnHover={true}
                pauseOnHover={true}
                pauseOnFocus={true}
                ariaLabel="Technology logos carousel"
              />
            </div>

            {/* Reverse Direction Loop */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 backdrop-blur-md">
              <LogoLoop
                logos={[...techLogos].reverse()}
                speed={75}
                direction="right"
                width="100%"
                logoHeight={40}
                gap={44}
                fadeOut={true}
                fadeOutColor="#020617"
                scaleOnHover={true}
                pauseOnHover={false}
                pauseOnFocus={true}
                ariaLabel="Technology logos carousel reverse"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;