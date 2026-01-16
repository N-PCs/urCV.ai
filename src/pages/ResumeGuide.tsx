import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Mail,
  User,
  Briefcase,
  GraduationCap,
  Code,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  ArrowRight,
  Eye,
  Trophy,
  AlertTriangle,
  Info
} from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/layout/Footer";

interface ComparisonItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  bad: {
    content: string | string[];
    issues: string[];
  };
  good: {
    content: string | string[];
    benefits: string[];
  };
  proTip: string;
}

const comparisonData: ComparisonItem[] = [
  {
    id: "contact",
    title: "Contact Information",
    icon: <Mail className="w-5 h-5" />,
    description: "Your first impression starts here. Make it count.",
    bad: {
      content: "coolgamer2000@yahoo.com | 555-1234 | Lives in California somewhere",
      issues: [
        "Unprofessional email address",
        "Incomplete phone number format",
        "Vague location—city matters for local roles",
        "Missing LinkedIn or portfolio links"
      ]
    },
    good: {
      content: "alex.johnson@email.com | (555) 123-4567 | San Francisco, CA | linkedin.com/in/alexjohnson | alexj.dev",
      benefits: [
        "Professional firstname.lastname email",
        "Properly formatted phone with area code",
        "City + State format for location",
        "Relevant professional links included"
      ]
    },
    proTip: "Create a professional email if needed—it takes 2 minutes and makes a lasting impression."
  },
  {
    id: "summary",
    title: "Professional Summary",
    icon: <User className="w-5 h-5" />,
    description: "Your elevator pitch in 2-3 sentences. Hook them fast.",
    bad: {
      content: "I am a hardworking individual looking for an opportunity to grow and learn. I have done many things in my career and am looking for a new challenge. I work well with others and am a team player.",
      issues: [
        "Self-focused rather than value-focused",
        "Generic phrases that apply to anyone",
        "No specific skills or achievements mentioned",
        "Doesn't indicate industry or expertise level"
      ]
    },
    good: {
      content: "Results-oriented Full-Stack Developer with 5+ years specializing in React and Node.js. Delivered 15+ production applications serving 2M+ users. Proven track record of reducing load times by 40% and mentoring junior developers. Seeking to leverage expertise in scalable architecture at a growth-stage startup.",
      benefits: [
        "Specific role and years of experience",
        "Quantified achievements with metrics",
        "Technical skills clearly stated",
        "Clear value proposition and career goal"
      ]
    },
    proTip: "Write your summary last—after completing other sections, you'll have better material to summarize."
  },
  {
    id: "experience",
    title: "Work Experience",
    icon: <Briefcase className="w-5 h-5" />,
    description: "Show impact, not just responsibilities. Results matter.",
    bad: {
      content: [
        "Responsible for managing the team",
        "Helped with various projects",
        "Did customer service duties",
        "Attended meetings and wrote reports"
      ],
      issues: [
        "Passive voice ('responsible for')",
        "No quantifiable results",
        "Vague descriptions without context",
        "Reads like a job description, not achievements"
      ]
    },
    good: {
      content: [
        "Led 8-person engineering team, delivering 12 features ahead of schedule",
        "Architected microservices migration reducing server costs by $50K/year",
        "Increased customer satisfaction scores from 72% to 94% in 6 months",
        "Presented quarterly analytics to C-suite, influencing $2M budget allocation"
      ],
      benefits: [
        "Strong action verbs at the start",
        "Specific numbers and percentages",
        "Clear cause and effect relationship",
        "Demonstrates leadership and business impact"
      ]
    },
    proTip: "Use the XYZ formula: Accomplished [X] as measured by [Y], by doing [Z]."
  },
  {
    id: "education",
    title: "Education",
    icon: <GraduationCap className="w-5 h-5" />,
    description: "Highlight relevant achievements, not just degrees.",
    bad: {
      content: "Went to State University, got a degree in Computer Science. GPA was okay. Took some classes.",
      issues: [
        "Informal, unprofessional tone",
        "Missing graduation date",
        "No relevant coursework or projects",
        "Vague about academic performance"
      ]
    },
    good: {
      content: "B.S. Computer Science, State University — May 2022 | GPA: 3.7/4.0\n• Dean's List (6 semesters) | Relevant: Data Structures, Machine Learning, Cloud Computing\n• Capstone: Built real-time analytics dashboard used by 3 campus departments",
      benefits: [
        "Clear degree, institution, and date",
        "GPA included (when favorable)",
        "Relevant coursework listed",
        "Projects demonstrating practical skills"
      ]
    },
    proTip: "Recent graduates: Lead with education. Experienced professionals: Keep it brief at the bottom."
  },
  {
    id: "skills",
    title: "Skills Section",
    icon: <Code className="w-5 h-5" />,
    description: "Be specific and honest. Generic skills waste space.",
    bad: {
      content: "Microsoft Office, Communication, Leadership, Problem-solving, Teamwork, Fast learner, Detail-oriented",
      issues: [
        "Expected skills that don't differentiate",
        "Soft skills without evidence",
        "No technical depth or specificity",
        "No skill levels or context"
      ]
    },
    good: {
      content: "Languages: Python (Expert), JavaScript/TypeScript (Advanced), SQL (Advanced)\nFrameworks: React, Django, FastAPI | Cloud: AWS (Certified), Docker, Kubernetes\nTools: Git, Jira, Figma | Data: Pandas, PostgreSQL, Redis",
      benefits: [
        "Organized by category",
        "Skill levels indicated",
        "Industry-relevant technologies",
        "Certifications highlighted"
      ]
    },
    proTip: "Tailor skills to each job—mirror the exact technologies mentioned in the job description."
  }
];

const statsData = [
  { label: "Average time recruiters spend on a resume", value: "6-7 sec", icon: <Eye className="w-5 h-5" /> },
  { label: "Resumes rejected by ATS before human review", value: "75%", icon: <AlertTriangle className="w-5 h-5" /> },
  { label: "Increase in callbacks with optimized resume", value: "40%", icon: <Trophy className="w-5 h-5" /> },
];

export default function ResumeGuide() {
  const [activeSection, setActiveSection] = useState("contact");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <div className="flex items-center gap-2">
                <img src="/websitelogo.png" alt="urCV.ai" className="w-8 h-8" />
                <span className="font-bold text-gray-900 dark:text-white">urCV.ai</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-white py-24">
        <div className="container mx-auto px-4 text-center">

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Transform Your Resume from
            <span className="text-yellow-300"> Ignored </span>
            to
            <span className="text-green-300"> Interviewed</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Side-by-side comparisons showing exactly what hiring managers want to see—and what makes them hit delete.
          </p>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
            {statsData.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
              >
                <div className="flex items-center justify-center gap-2 mb-2 text-yellow-300">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Section Tabs */}
          <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
            <TabsList className="grid grid-cols-5 gap-2 mb-8 h-auto p-2 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
              {comparisonData.map((item) => (
                <TabsTrigger
                  key={item.id}
                  value={item.id}
                  className="flex items-center gap-2 py-3 px-4 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg transition-all"
                >
                  {item.icon}
                  <span className="hidden sm:inline">{item.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {comparisonData.map((section) => (
              <TabsContent key={section.id} value={section.id} className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Section Header */}
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {section.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">{section.description}</p>
                  </div>

                  {/* Comparison Cards */}
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Bad Example */}
                    <Card className="overflow-hidden border-2 border-red-200 dark:border-red-900 bg-white dark:bg-gray-900">
                      <div className="bg-red-100 dark:bg-red-950/50 px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                            <XCircle className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-red-700 dark:text-red-400">What NOT to Do</h3>
                            <p className="text-sm text-red-600 dark:text-red-300">Common mistakes to avoid</p>
                          </div>
                        </div>
                        <ThumbsDown className="w-6 h-6 text-red-400" />
                      </div>

                      <div className="p-6">
                        {/* Content */}
                        <div className="bg-red-50 dark:bg-red-950/30 rounded-lg p-4 mb-6 border border-red-200 dark:border-red-900">
                          {Array.isArray(section.bad.content) ? (
                            <ul className="space-y-2 font-mono text-sm text-red-800 dark:text-red-200">
                              {section.bad.content.map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-red-400">•</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="font-mono text-sm text-red-800 dark:text-red-200 whitespace-pre-line">
                              {section.bad.content}
                            </p>
                          )}
                        </div>

                        {/* Issues */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold">
                            <AlertTriangle className="w-4 h-4" />
                            Common Issues
                          </div>
                          <ul className="space-y-2">
                            {section.bad.issues.map((issue, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                                {issue}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Card>

                    {/* Good Example */}
                    <Card className="overflow-hidden border-2 border-green-200 dark:border-green-900 bg-white dark:bg-gray-900">
                      <div className="bg-green-100 dark:bg-green-950/50 px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-green-700 dark:text-green-400">The Professional Way</h3>
                            <p className="text-sm text-green-600 dark:text-green-300">What gets interviews</p>
                          </div>
                        </div>
                        <ThumbsUp className="w-6 h-6 text-green-400" />
                      </div>

                      <div className="p-6">
                        {/* Content */}
                        <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-4 mb-6 border border-green-200 dark:border-green-900">
                          {Array.isArray(section.good.content) ? (
                            <ul className="space-y-2 font-mono text-sm text-green-800 dark:text-green-200">
                              {section.good.content.map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-green-400">•</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="font-mono text-sm text-green-800 dark:text-green-200 whitespace-pre-line">
                              {section.good.content}
                            </p>
                          )}
                        </div>

                        {/* Benefits */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                            <Trophy className="w-4 h-4" />
                            Why It Works
                          </div>
                          <ul className="space-y-2">
                            {section.good.benefits.map((benefit, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Pro Tip */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-8 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 dark:from-blue-500/20 dark:via-purple-500/20 dark:to-blue-500/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                        <Info className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-1">💡 Pro Tip</h4>
                        <p className="text-gray-600 dark:text-gray-300">{section.proTip}</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-2xl p-10 text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Apply These Tips?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Our AI-powered builder automatically implements these best practices. Create a professional resume in minutes, not hours.
            </p>
            <Link to="/builder">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                Start Building Your CV
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <p className="text-sm text-blue-200 mt-4">Free to use • No signup required</p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

