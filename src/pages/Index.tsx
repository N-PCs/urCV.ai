import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, User, Edit, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/layout/Footer";
import LogoLoop from '@/components/LogoLoop';
import ResumeTipsSection from '@/components/resume/ResumeTipsSection';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiVite, SiVercel, SiFigma, SiGithub, SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiDocker, SiGooglecloud, SiFirebase } from 'react-icons/si';


const techLogos = [
  {
    node: <SiReact className="text-[#61DAFB]" size={48} />,
    title: "React",
    href: "https://react.dev"
  },
  {
    node: <SiNextdotjs className="text-white" size={48} />,
    title: "Next.js",
    href: "https://nextjs.org"
  },
  {
    node: <SiTypescript className="text-[#3178C6]" size={48} />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org"
  },
  {
    node: <SiTailwindcss className="text-[#06B6D4]" size={48} />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com"
  },
  {
    node: <SiVite className="text-[#646CFF]" size={48} />,
    title: "Vite",
    href: "https://vitejs.dev"
  },
  {
    node: <SiVercel className="text-white" size={48} />,
    title: "Vercel",
    href: "https://vercel.com"
  },
  {
    node: <SiFigma className="text-[#F24E1E]" size={48} />,
    title: "Figma",
    href: "https://figma.com"
  },
  {
    node: <SiGithub className="text-white" size={48} />,
    title: "GitHub",
    href: "https://github.com"
  },
  {
    node: <SiNodedotjs className="text-[#339933]" size={48} />,
    title: "Node.js",
    href: "https://nodejs.org"
  },
  {
    node: <SiExpress className="text-white" size={48} />,
    title: "Express",
    href: "https://expressjs.com"
  },
  {
    node: <SiMongodb className="text-[#47A248]" size={48} />,
    title: "MongoDB",
    href: "https://mongodb.com"
  },
  {
    node: <SiDocker className="text-[#2496ED]" size={48} />,
    title: "Docker",
    href: "https://docker.com"
  },
  {
    node: <SiGooglecloud className="text-white" size={48} />,
    title: "Google Cloud",
    href: "https://cloud.google.com"
  },
  {
    node: <SiFirebase className="text-[#FFCA28]" size={48} />,
    title: "Firebase",
    href: "https://firebase.google.com"
  },
];

import { useState } from 'react';
import TestimonialsSection from '@/components/TestimonialsSection';
import ReviewForm from '@/components/ReviewForm';

const Index = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleReviewSubmitted = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 overflow-hidden font-sans transition-colors duration-300">
      
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden">
                <motion.img 
                  alt="website logo" 
                  src="./websitelogo.png"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                urCV.ai
              </span>
            </motion.div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link to="/builder">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-medium group relative overflow-hidden">
                    <span className="relative z-10 flex items-center gap-2">
                      Create Resume
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      
      <motion.div 
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative container mx-auto px-4 py-24 md:py-32 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/10 transition-colors duration-300 overflow-hidden"
      >
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                opacity: 0,
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
              }}
              animate={{
                opacity: [0, 0.5, 0],
                x: Math.random() * 200 - 100,
                y: Math.random() * 200 - 100,
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: i * 0.2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute w-2 h-2 bg-blue-400/20 dark:bg-blue-500/20 rounded-full blur-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="text-center max-w-4xl mx-auto relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2"
          >
            <div className="inline-block px-5 py-2.5 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold mb-8 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-default">
              <Sparkles className="w-4 h-4 inline mr-2" />
              New: AI-Powered Resume Analysis
            </div>
          </motion.div>

          {/* Main Heading with stagger animation */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight"
          >
            Build Your
            <motion.span
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "200% 50%" }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
              style={{ backgroundSize: "200% 100%" }}
            >
              Professional CV
            </motion.span>
            in Minutes
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Create stunning, ATS-friendly resumes with our intelligent builder.
            Stand out from the crowd with professional templates designed by experts.
          </motion.p>

          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/builder">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-6 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl font-semibold text-lg group relative overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    Start Building Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  />
                </Button>
              </motion.div>
            </Link>
            <Link to="/templates">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="outline" className="border-2 border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm text-gray-700 dark:text-gray-200 hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 px-10 py-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg">
                  View Templates
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>

        
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-3xl blur-2xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
        />
      </motion.div>

      
      <div className="container mx-auto px-4 py-24 md:py-32 dark:bg-gray-950 transition-colors duration-300">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Why Choose{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              urCV.ai
            </span>
            ?
          </motion.h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Experience the future of resume building with our AI-powered platform
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            icon={User}
            title="Smart Input Forms"
            description="Intuitive forms that guide you through every section, ensuring you don't miss any important details"
            delay={0.1}
          />
          <FeatureCard
            icon={Edit}
            title="AI Enhancement"
            description="Our AI analyzes your experience and provides intelligent suggestions to improve impact and readability"
            delay={0.2}
          />
          <FeatureCard
            icon={FileText}
            title="Professional Templates"
            description="Beautiful, ATS-friendly templates designed by professionals to help you make the best impression"
            delay={0.3}
          />
        </div>
      </div>

      <ResumeTipsSection />

      <TestimonialsSection refreshTrigger={refreshTrigger} />
      <ReviewForm onReviewSubmitted={handleReviewSubmitted} />

      
      <section className="relative overflow-hidden py-20 sm:py-24 animate-fade-in">
        
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
            A carefully picked stack that keeps the app fast, responsive, and easy to maintain.
          </p>

          <div className="mt-12 space-y-6">
            
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

