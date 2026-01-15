import { FileText, Facebook, Twitter, Linkedin, Instagram, Send, Mail, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigation = [
    { label: 'Home', href: '/' },
    { label: 'Templates', href: '/templates' },
    { label: 'Builder', href: '/builder' },
    { label: 'Documentation', href: '/documentation' },
  ]
  return (
    <footer className="bg-slate-950 text-slate-200 border-t border-slate-800">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

          {/* Brand Section */}
          <div className="space-y-5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20">
                <img src="./websitelogo.png" alt="urCV.ai logo" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                urCV.ai
              </span>
            </div>

            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Building the future of computing solutions with intelligent,
              AI-driven architectures.
            </p>

            <div className="flex space-x-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  aria-label="social link"
                  className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center
                             text-slate-400 hover:bg-blue-600 hover:text-white transition"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            <span className="inline-block px-3 py-1 rounded-full bg-blue-900/30
                             text-blue-400 text-xs font-medium border border-blue-800">
              AcWoc 2026 Initiative
            </span>
        </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-white">Platform</h3>
                        <ul className="space-y-3 text-sm">
                            {['Home', 'Templates', 'Builder', 'Documentation'].map((item) => (
                                <li key={item}>
                                    <Link 
                                        to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
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
                                <Link to="/privacy-policy" className="text-slate-400 hover:text-blue-400 transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms-of-service" className="text-slate-400 hover:text-blue-400 transition-colors">
                                    Terms of Service
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

                    {/* Newsletter / CTA */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 text-white">Stay Updated</h3>
                        <p className="text-slate-400 text-sm mb-4">
                            Subscribe to our newsletter for the latest AI updates and features.
                        </p>
                        <div className="flex space-x-2">
                            <Input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="bg-slate-900 border-slate-700 text-slate-200 focus:border-blue-500 placeholder:text-slate-600"
                            />
                            <Button size="icon" className="bg-blue-600 hover:bg-blue-700 text-white shrink-0">
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <Separator className="bg-slate-800 my-8" />

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-slate-500 text-sm flex flex-col md:flex-row items-center gap-2 md:gap-4">
                        <span>&copy; {currentYear} N-PCs. All rights reserved.</span>
                        <span className="hidden md:inline text-slate-700">|</span>
                        <span className="flex items-center gap-1">
                            Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> by Neel Pandey
                        </span>
                    </div>

                    {/* Social Icons */}
                    <div className="flex items-center gap-4">
                        {[
                            { icon: Facebook, href: "#" },
                            { icon: Twitter, href: "#" },
                            { icon: Linkedin, href: "#" },
                            { icon: Instagram, href: "#" }
                        ].map(({ icon: Icon, href }, index) => (
                            <a
                                key={index}
                                href={href}
                                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                            >
                                <Icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;