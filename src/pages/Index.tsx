import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, User, Edit, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
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

// Animated Feature Card Component
const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  delay = 0 
}: { 
  icon: any; 
  title: string; 
  description: string; 
  delay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.22, 1, 0.36, 1] 
      }}
    >
      <Card className="p-8 text-center h-full transition-all duration-500 border border-gray-100 dark:border-gray-800 dark:bg-gray-900 shadow-sm hover:shadow-2xl hover:scale-105 group cursor-pointer overflow-hidden relative">
        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-purple-600/0 to-blue-600/0 group-hover:from-blue-600/5 group-hover:via-purple-600/5 group-hover:to-blue-600/5 transition-all duration-500" />
        
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/50 dark:to-blue-800/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-xl group-hover:shadow-blue-500/30 transition-all duration-500 relative z-10"
        >
          <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
        </motion.div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 relative z-10">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed relative z-10">
          {description}
        </p>
        
        {/* Decorative corner element */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Card>
    </motion.div>
  );
};

const Index = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  // Parallax effect for hero section
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 overflow-hidden font-sans transition-colors duration-300">
      {/* Animated Navigation with backdrop blur */}
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
                    {/* Button shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section with Parallax */}
      <motion.div 
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative container mx-auto px-4 py-24 md:py-32 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/10 transition-colors duration-300 overflow-hidden"
      >
        {/* Animated background elements */}
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
          {/* Badge with animation */}
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

          {/* CTA Buttons */}
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

        {/* Floating decorative elements */}
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

      {/* Features Section with Scroll Animation */}
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

      {/* CTA Section with Logo Loop */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-24 overflow-hidden"
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-full h-full bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-blue-600/30"
            style={{ backgroundSize: "200% 200%" }}
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-white mb-6"
          >
            Built with Modern Technology
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-300 mb-16 max-w-2xl mx-auto"
          >
            Our platform leverages cutting-edge tools to deliver the best resume building experience
          </motion.p>
          
          {/* Main Horizontal Logo Loop */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-16"
          >
            <LogoLoop
              logos={techLogos}
              speed={100}
              direction="left"
              width="100%"
              logoHeight={60}
              gap={80}
              fadeOut={true}
              fadeOutColor="#0f172a"
              scaleOnHover={true}
              pauseOnHover={true}
              ariaLabel="Technology logos carousel"
            />
          </motion.div>

          {/* Reverse Direction Loop */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-16"
          >
            <LogoLoop
              logos={[...techLogos].reverse()}
              speed={80}
              direction="right"
              width="100%"
              logoHeight={50}
              gap={60}
              fadeOut={true}
              fadeOutColor="#0f172a"
              scaleOnHover={true}
              pauseOnHover={false}
              ariaLabel="Technology logos carousel reverse"
            />
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
      </motion.div>

      <Footer />
    </div>
  );
};

export default Index;
