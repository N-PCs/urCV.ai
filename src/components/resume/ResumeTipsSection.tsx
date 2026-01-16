import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  TrendingUp,
  Zap,
  Award,
  BookOpen,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const tipCategories = [
  {
    id: "impact",
    icon: <Target className="w-5 h-5" />,
    label: "Impact",
    color: "bg-purple-500",
    tips: [
      {
        title: "Lead with Results",
        description: "Start bullet points with quantifiable achievements. Numbers grab attention and prove your value instantly.",
        example: {
          bad: "Helped with marketing campaigns",
          good: "Drove 47% increase in lead generation through targeted email campaigns reaching 50K+ subscribers"
        }
      },
      {
        title: "Use the STAR Method",
        description: "Structure achievements as Situation, Task, Action, Result to tell compelling stories.",
        example: {
          bad: "Improved team efficiency",
          good: "Identified workflow bottleneck (S), redesigned approval process (T/A), reducing project delivery time by 35% (R)"
        }
      }
    ]
  },
  {
    id: "keywords",
    icon: <Zap className="w-5 h-5" />,
    label: "ATS Keywords",
    color: "bg-blue-500",
    tips: [
      {
        title: "Mirror Job Descriptions",
        description: "Include exact keywords from the job posting. ATS systems scan for specific terms before human eyes see your resume.",
        example: {
          bad: "Good at coding and making websites",
          good: "Full-stack development using React, Node.js, PostgreSQL, and AWS (terms from job description)"
        }
      },
      {
        title: "Industry-Specific Terms",
        description: "Use proper terminology for your field. Generic descriptions can make you seem inexperienced.",
        example: {
          bad: "Made the app faster",
          good: "Optimized API response time through query indexing and Redis caching implementation"
        }
      }
    ]
  },
  {
    id: "format",
    icon: <Award className="w-5 h-5" />,
    label: "Formatting",
    color: "bg-emerald-500",
    tips: [
      {
        title: "Reverse Chronological Order",
        description: "List your most recent experience first. Recruiters spend 6-7 seconds on initial scan—make those seconds count.",
        example: {
          bad: "Random order of jobs and dates",
          good: "2024-Present → 2022-2024 → 2020-2022"
        }
      },
      {
        title: "Consistent Formatting",
        description: "Use uniform fonts, bullet styles, and date formats throughout. Inconsistency signals lack of attention to detail.",
        example: {
          bad: "Jan 2020, 2021-22, March '23",
          good: "Jan 2020 - Dec 2021, Jan 2022 - Present"
        }
      }
    ]
  },
  {
    id: "action",
    icon: <TrendingUp className="w-5 h-5" />,
    label: "Action Verbs",
    color: "bg-orange-500",
    tips: [
      {
        title: "Start Strong",
        description: "Begin each bullet with a powerful action verb. Avoid passive language that diminishes your contributions.",
        example: {
          bad: "Was responsible for managing...",
          good: "Spearheaded, Orchestrated, Pioneered, Transformed..."
        }
      },
      {
        title: "Vary Your Vocabulary",
        description: "Don't repeat the same verbs. Use a diverse range to showcase different skills and responsibilities.",
        example: {
          bad: "Managed team. Managed budget. Managed projects.",
          good: "Led cross-functional team. Controlled $2M budget. Delivered 12 projects on schedule."
        }
      }
    ]
  }
];

const resumeExamples = [
  {
    role: "Software Engineer",
    icon: "💻",
    summary: "Results-driven software engineer with 4+ years building scalable applications. Reduced deployment time by 60% through CI/CD implementation.",
    highlights: [
      "Architected microservices handling 1M+ daily requests",
      "Mentored 5 junior developers, improving team velocity by 40%",
      "Open-source contributor with 2K+ GitHub stars"
    ]
  },
  {
    role: "Product Manager",
    icon: "📊",
    summary: "Strategic product leader who launched 3 products generating $5M ARR. Expert in data-driven decision making and cross-functional leadership.",
    highlights: [
      "Grew user base from 10K to 500K in 18 months",
      "Achieved 92 NPS score through customer-centric design",
      "Reduced churn by 25% with targeted feature releases"
    ]
  },
  {
    role: "UX Designer",
    icon: "🎨",
    summary: "Human-centered designer with a track record of increasing conversion rates by 150%. Passionate about accessible, inclusive design systems.",
    highlights: [
      "Redesigned checkout flow, boosting completion by 34%",
      "Created design system adopted by 8 product teams",
      "Led usability studies with 200+ participants"
    ]
  }
];

export default function ResumeTipsSection() {
  const [activeCategory, setActiveCategory] = useState(tipCategories[0].id);
  const [activeTipIndex, setActiveTipIndex] = useState(0);

  const currentCategory = tipCategories.find(c => c.id === activeCategory);
  const currentTip = currentCategory?.tips[activeTipIndex];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Craft a Resume That
            <span className="leading-tight animate-fade-in text-blue-600 dark:text-blue-400"> Gets Noticed</span>
          </h2>
          <p className="text-s text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Expert strategies and real examples to help you stand out from hundreds of applicants
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Left Side - Interactive Tips */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Lightbulb className="w-6 h-6 text-yellow-500" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Pro Tips</h3>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {tipCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setActiveTipIndex(0);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? `${category.color} text-white shadow-lg scale-105`
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {category.icon}
                  {category.label}
                </button>
              ))}
            </div>

            {/* Tip Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${activeTipIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 border-2 border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                      {currentTip?.title}
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      {activeTipIndex + 1}/{currentCategory?.tips.length}
                    </Badge>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {currentTip?.description}
                  </p>

                  {/* Good vs Bad Example */}
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900">
                      <div className="flex items-center gap-2 mb-2">
                        <XCircle className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-semibold text-red-700 dark:text-red-400">Avoid</span>
                      </div>
                      <p className="text-sm text-red-600 dark:text-red-300 font-mono">
                        {currentTip?.example.bad}
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-semibold text-green-700 dark:text-green-400">Better</span>
                      </div>
                      <p className="text-sm text-green-600 dark:text-green-300 font-mono">
                        {currentTip?.example.good}
                      </p>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <button
                      onClick={() => setActiveTipIndex(prev => Math.max(0, prev - 1))}
                      disabled={activeTipIndex === 0}
                      className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ← Previous
                    </button>
                    <button
                      onClick={() => setActiveTipIndex(prev =>
                        Math.min((currentCategory?.tips.length || 1) - 1, prev + 1)
                      )}
                      disabled={activeTipIndex === (currentCategory?.tips.length || 1) - 1}
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next Tip <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side - Resume Examples */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-6 h-6 text-blue-500" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Winning Examples</h3>
            </div>

            <div className="space-y-4">
              {resumeExamples.map((example, index) => (
                <motion.div
                  key={example.role}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-5 border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 group">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{example.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {example.role}
                          </h4>
                          <Sparkles className="w-4 h-4 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 italic">
                          "{example.summary}"
                        </p>
                        <ul className="space-y-1.5">
                          {example.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                              <span className="text-blue-500 mt-1">•</span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* CTA to Full Guide */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <Link to="/resume-guide">
                <Button
                  variant="outline"
                  className="w-full py-6 text-base border-2 border-dashed border-blue-300 dark:border-blue-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 group"
                >
                  <span className="flex items-center gap-2">
                    See Complete Resume Guide with Before/After Examples
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

