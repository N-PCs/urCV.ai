import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, User, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "@/components/layout/Footer";
import LogoLoop from '@/components/LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiVite, SiVercel, SiFigma, SiGithub, SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiDocker, SiGooglecloud, SiFirebase } from 'react-icons/si';

// Create a larger array of logos for better animation
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
    node: <SiPostgresql className="text-[#4169E1]" size={48} />, 
    title: "PostgreSQL", 
    href: "https://postgresql.org" 
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

const Index = () => {
  return (
    <div className="min-h-screen bg-white overflow-hidden font-sans">
      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <img alt="website img" src="./websitelogo.png"></img>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                urCV.ai
              </span>
            </div>
            <Link to="/builder">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md font-medium">
                Create Resume
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-24 bg-gray-50">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6 animate-fade-in">
            New: AI-Powered Resume Analysis
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight animate-fade-in">
            Build Your
            <span className="text-blue-600"> Professional CV </span>
            in Minutes
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-delayed">
            Create stunning, ATS-friendly resumes with our intelligent builder.
            Stand out from the crowd with professional templates designed by experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Link to="/builder">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold text-lg">
                Start Building Now
              </Button>
            </Link>
            <Link to="/templates">
              <Button size="lg" variant="outline" className="border-2 border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 px-8 py-4 rounded-lg transition-all duration-300 font-semibold text-lg">
                View Templates
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose urCV.ai?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the future of resume building with our AI-powered platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 shadow-sm animate-slide-in-left group">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300">
              <User className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Input Forms</h3>
            <p className="text-gray-600 leading-relaxed">
              Intuitive forms that guide you through every section, ensuring you don't miss any important details
            </p>
          </Card>

          <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 shadow-sm animate-fade-in animation-delay-200 group">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300">
              <Edit className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">AI Enhancement</h3>
            <p className="text-gray-600 leading-relaxed">
              Our AI analyzes your experience and provides intelligent suggestions to improve impact and readability
            </p>
          </Card>

          <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 shadow-sm animate-slide-in-right group">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 transition-colors duration-300">
              <FileText className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Professional Templates</h3>
            <p className="text-gray-600 leading-relaxed">
              Beautiful, ATS-friendly templates designed by professionals to help you make the best impression
            </p>
          </Card>
        </div>
      </div>

      {/* CTA Section with Logo Loop */}
      <div className="bg-gradient-to-br from-slate-900 to-blue-900 py-20 animate-fade-in">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Built with Modern Technology
          </h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Our platform leverages cutting-edge tools to deliver the best resume building experience
          </p>
          
          {/* Main Horizontal Logo Loop */}
          <div className="mb-16">
            <div>
              <LogoLoop
                logos={techLogos}
                speed={100} // Increased speed for better visibility
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
            </div>
          </div>

          {/* Optional: Reverse Direction Loop */}
          <div className="mb-16">
            <div>
              <LogoLoop
                logos={[...techLogos].reverse()} // Reverse order for variety
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
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-8">
            <Link to="/builder">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 font-bold text-lg hover:scale-105">
                🚀 Start Building Your Resume Now
              </Button>
            </Link>
            <p className="text-slate-400 mt-4 text-sm">
              No credit card required • Get started in seconds
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;