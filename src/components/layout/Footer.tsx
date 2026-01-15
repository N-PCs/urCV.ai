import {
  FileText,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Send,
  Mail,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import CurvedLoop from '@/components/CurvedLoop';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-200 border-t border-slate-800 relative overflow-hidden">
      {/* CurvedLoop as Background */}
      <div className="absolute top-[-20%] left-0 right-0 bottom-0 z-0 opacity-10">
        <CurvedLoop 
          marqueeText="Be ✦ Creative ✦ With ✦ urCV.ai ✦"
          speed={2}
          curveAmount={-300}
          direction="right"
          interactive={true}
          className="text-white"
        />
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20">
                <img alt="logo" src="./websitelogo.png"></img>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                urCV.ai
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Building the future of computing solutions with intelligent,
              AI-driven architectures.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 text-xs font-medium border border-blue-800">
                Open-Source 2026 Initiative
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Platform</h3>
            <ul className="space-y-3 text-sm">
              {["Home", "Templates", "Builder", "Documentation"].map((item) => (
                <li key={item}>
                  <Link
                    to={
                      item === "Home"
                        ? "/"
                        : item === "Documentation"
                        ? "https://github.com/N-PCs/urCV.ai/blob/main/README.md"
                        : `/${item.toLowerCase()}`
                    }
                    className="text-slate-400 hover:text-blue-400 transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 transition-all duration-300 h-px bg-blue-400 mr-0 group-hover:mr-2"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="https://github.com/N-PCs/urCV.ai"
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                >
                  Github
                </Link>
              </li>
              <li>
                <Link
                  to="https://github.com/N-PCs/urCV.ai/issues"
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                >
                  Issues & PRs
                </Link>
              </li>
              <li className="pt-2">
                <a
                  href="mailto:neelpandeyofficial@gmail.com"
                  className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors group"
                >
                  <Mail className="w-4 h-4 group-hover:text-blue-400" />
                  <span>neelpandeyofficial@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-slate-800 my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <div className="text-slate-500 text-sm flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <span>&copy; {currentYear} N-PCs. All rights reserved.</span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" />{" "}
              by Neel Pandey and Other Contributors
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;