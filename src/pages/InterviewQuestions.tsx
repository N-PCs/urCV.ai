import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Briefcase, 
  Users, 
  Target, 
  Lightbulb, 
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  MessageSquare
} from "lucide-react";
import { Link } from "react-router-dom";

const interviewQuestions = {
  general: [
    {
      question: "Tell me about yourself.",
      answer: "Provide a concise summary of your professional background, highlighting key experiences and achievements relevant to the position. Keep it to 2-3 minutes.",
      exampleResponse: "I'm a software developer with 5 years of experience building web applications. In my current role at TechCorp, I led the development of a customer portal that increased user engagement by 40%. I specialize in React and Node.js, and I'm passionate about creating intuitive user experiences. I'm particularly excited about this opportunity because it aligns with my experience in e-commerce solutions and allows me to work with a team that values innovation.",
      category: "general",
      difficulty: "easy"
    },
    {
      question: "What are your greatest strengths?",
      answer: "Focus on 2-3 key strengths that are relevant to the job. Provide specific examples of how you've demonstrated these strengths in previous roles.",
      exampleResponse: "My greatest strengths are problem-solving and collaboration. For example, in my last project, we faced a critical performance issue that was causing slow load times. I analyzed the codebase, identified bottlenecks, and implemented caching solutions that improved performance by 60%. I also worked closely with the design team to ensure the changes didn't affect the user experience. This demonstrates both my technical problem-solving skills and my ability to collaborate effectively with cross-functional teams.",
      category: "general",
      difficulty: "easy"
    },
    {
      question: "What is your greatest weakness?",
      answer: "Choose a real weakness that you're actively working to improve. Show self-awareness and demonstrate steps you're taking to address it.",
      exampleResponse: "I used to struggle with delegating tasks because I wanted to ensure everything was done perfectly. However, I recognized that this was affecting team productivity and my own workload. I've been actively working on this by: 1) taking a leadership course on effective delegation, 2) implementing a project management system to track delegated tasks, and 3) regularly seeking feedback from my team. As a result, I've become more comfortable trusting my team members and have seen improved team efficiency.",
      category: "general",
      difficulty: "medium"
    },
    {
      question: "Why do you want to work here?",
      answer: "Research the company beforehand. Mention specific aspects that appeal to you - company culture, values, products, or opportunities for growth.",
      exampleResponse: "I've been following your company's work in the AI space for the past year, and I'm particularly impressed by your recent launch of the machine learning platform. Your commitment to ethical AI development resonates with my own values. Additionally, the collaborative culture you've fostered, as evidenced by your open-source contributions and team structure, aligns perfectly with how I work best. I believe my experience in scalable backend systems would be valuable as you continue to grow your platform.",
      category: "general",
      difficulty: "medium"
    },
    {
      question: "Where do you see yourself in 5 years?",
      answer: "Show ambition while being realistic. Connect your goals to the company's growth opportunities and demonstrate commitment to your field.",
      exampleResponse: "In 5 years, I see myself growing into a senior technical role where I can lead larger projects and mentor junior developers. I'm particularly interested in developing expertise in cloud architecture and distributed systems, which I know is a key area of growth for your company. I want to continue deepening my technical skills while also contributing to the strategic direction of the products we build. Ultimately, I hope to be someone who can help drive technical innovation while supporting the team's success.",
      category: "general",
      difficulty: "medium"
    }
  ],
  behavioral: [
    {
      question: "Tell me about a time you faced a challenge at work.",
      answer: "Use the STAR method: Situation, Task, Action, Result. Describe the context, what you needed to do, actions you took, and positive outcomes.",
      exampleResponse: "Situation: Our team was tasked with migrating a legacy system to a new platform with a tight deadline of 3 months. Task: I was responsible for leading the backend migration while ensuring zero downtime for our users. Action: I created a detailed migration plan, implemented parallel testing environments, and coordinated with frontend and DevOps teams. I also established daily check-ins and automated rollback procedures. Result: We completed the migration 2 weeks ahead of schedule with 99.9% uptime during the transition, and the new system improved performance by 40%.",
      category: "behavioral",
      difficulty: "medium"
    },
    {
      question: "Describe a situation where you had to work with a difficult team member.",
      answer: "Focus on how you maintained professionalism, found common ground, and achieved project goals despite interpersonal challenges.",
      exampleResponse: "I worked with a team member who had very different communication styles and often questioned my technical decisions. Instead of getting defensive, I scheduled a one-on-one meeting to understand their perspective. I learned they were concerned about system security, which was actually a valid point I hadn't fully considered. We agreed on additional security testing and I made sure to include them in technical discussions early. This not only improved our working relationship but also resulted in a more robust final product. The project was successful, and we eventually became strong collaborators.",
      category: "behavioral",
      difficulty: "medium"
    },
    {
      question: "Tell me about a time you failed at something.",
      answer: "Be honest and take responsibility. Focus on what you learned from the experience and how it helped you grow professionally.",
      exampleResponse: "In my first year as a developer, I underestimated the complexity of a feature and promised an unrealistic deadline to a client. When I realized we couldn't deliver on time, I immediately informed my manager and the client, taking full responsibility for the misestimation. I proposed a phased delivery approach that would provide the most critical features first. Although it was a difficult conversation, the client appreciated the transparency. This experience taught me the importance of thorough project planning and under-promising. Since then, I always build in buffer time and involve senior team members in complex estimations.",
      category: "behavioral",
      difficulty: "hard"
    },
    {
      question: "Describe a situation where you took initiative.",
      answer: "Highlight times you went beyond your job description, identified problems, and implemented solutions without being asked.",
      exampleResponse: "I noticed our team was spending significant time manually deploying code updates, which was error-prone and time-consuming. Although it wasn't part of my assigned responsibilities, I researched CI/CD solutions and built a proof-of-concept automated deployment pipeline. I presented it to my manager with a cost-benefit analysis showing it would save 10 hours per week. After getting approval, I implemented the full solution and trained the team. This initiative reduced deployment errors by 95% and allowed us to release updates 3x faster. It's now become the standard process across the department.",
      category: "behavioral",
      difficulty: "medium"
    },
    {
      question: "Tell me about a time you had to meet a tight deadline.",
      answer: "Demonstrate your time management skills, prioritization abilities, and how you handle pressure while maintaining quality.",
      exampleResponse: "We had a critical client demo scheduled in 48 hours, and the main feature wasn't working due to a database issue. I immediately organized a war room session with the relevant team members. We identified the root cause within 2 hours and divided the work: I focused on fixing the database schema while another team member handled the API layer. I also created a simple backup solution in case the fix didn't work. We worked through the night, tested thoroughly, and had the feature working perfectly 4 hours before the demo. The client was impressed with the functionality, and we secured the contract. This experience showed me the importance of staying calm under pressure and having contingency plans.",
      category: "behavioral",
      difficulty: "medium"
    }
  ],
  technical: [
    {
      question: "What technical skills do you consider your strongest?",
      answer: "List specific technologies, tools, or methodologies. Provide examples of projects where you've applied these skills successfully.",
      exampleResponse: "My strongest technical skills are in full-stack JavaScript development and cloud architecture. I'm proficient in React, Node.js, and TypeScript, with 4 years of experience building scalable web applications. For example, I recently architected a microservices-based e-commerce platform using Docker and Kubernetes, which handled 100,000+ daily users. I'm also skilled in database optimization - I implemented query optimization that reduced database load by 70% in my current role. Additionally, I have extensive experience with AWS services, particularly Lambda, RDS, and CloudFormation for infrastructure as code.",
      category: "technical",
      difficulty: "easy"
    },
    {
      question: "How do you stay updated with the latest technology trends?",
      answer: "Mention blogs, courses, conferences, or communities you follow. Show genuine passion for continuous learning.",
      exampleResponse: "I'm passionate about continuous learning and dedicate 5-6 hours weekly to staying current. I follow several tech blogs like Martin Fowler's and the AWS Architecture Blog, and I'm active on GitHub, contributing to open-source projects. I also take online courses through platforms like Coursera and Udemy - recently completed the Advanced React Patterns course. I attend local tech meetups and try to attend at least one major conference annually, like AWS re:Invent. Additionally, I'm part of a study group where we discuss new technologies and work on side projects together.",
      category: "technical",
      difficulty: "easy"
    },
    {
      question: "Describe a complex technical problem you solved.",
      answer: "Explain the problem, your approach to solving it, technical challenges faced, and the final solution with its impact.",
      exampleResponse: "We faced a critical issue where our real-time collaboration feature was causing server crashes during peak usage. The problem was complex - it involved race conditions in our WebSocket connections and memory leaks in our Node.js backend. I implemented a comprehensive debugging strategy using monitoring tools and custom logging. I discovered the issue was caused by improper event listener cleanup and inefficient data synchronization. I redesigned the architecture using Redis for state management and implemented proper connection pooling. The solution reduced server crashes by 100% and improved real-time performance by 80%. I also documented the solution and created best practices for the team.",
      category: "technical",
      difficulty: "hard"
    },
    {
      question: "How do you ensure code quality and maintainability?",
      answer: "Discuss code reviews, testing, documentation, and best practices you follow to write clean, maintainable code.",
      exampleResponse: "I follow a multi-layered approach to code quality. First, I write comprehensive tests - unit tests with Jest, integration tests, and E2E tests with Cypress, aiming for 80%+ coverage. I use ESLint and Prettier for consistent code formatting. For code reviews, I've established a checklist that includes security checks, performance considerations, and documentation requirements. I also practice the Boy Scout Rule - leaving code cleaner than I found it. Additionally, I maintain detailed technical documentation and use tools like Storybook for component documentation. In my current team, these practices reduced bugs by 60% and improved onboarding time for new developers.",
      category: "technical",
      difficulty: "medium"
    },
    {
      question: "What's your experience with [specific technology]?",
      answer: "Be honest about your experience level. Provide examples of projects and explain how you've used the technology effectively.",
      exampleResponse: "I have 3 years of experience with React, starting from class-based components through to modern hooks and concurrent features. In my current role, I built a complex dashboard application using React with TypeScript, implementing features like real-time data updates, advanced filtering, and data visualization with D3.js. I've also worked with React Native for a mobile app, where I had to optimize performance for older devices. I'm comfortable with the ecosystem - Redux for state management, React Router for navigation, and I've implemented custom hooks for shared logic. I also stay updated with React best practices and have contributed to improving our team's React component library.",
      category: "technical",
      difficulty: "varies"
    }
  ],
  situational: [
    {
      question: "What would you do if you disagreed with your manager's decision?",
      answer: "Show respect for authority while demonstrating your ability to communicate constructively. Emphasize finding common ground.",
      exampleResponse: "If I disagreed with my manager's decision, I would first seek to understand their perspective fully by asking clarifying questions about their reasoning and the constraints they're considering. Then, I would schedule a private meeting to discuss my concerns respectfully, presenting data or examples to support my viewpoint. I would focus on the shared goal - what's best for the project or company - rather than just being right. If they still maintained their position after hearing my concerns, I would respect their decision while ensuring I understood the rationale, and then implement it to the best of my ability. I believe healthy disagreement leads to better decisions when handled professionally.",
      category: "situational",
      difficulty: "hard"
    },
    {
      question: "How would you handle multiple competing priorities?",
      answer: "Demonstrate your prioritization skills, ability to communicate with stakeholders, and time management strategies.",
      exampleResponse: "When faced with competing priorities, I use a systematic approach. First, I assess each task based on urgency, impact, and alignment with company goals. I create a priority matrix and identify any dependencies. Then I communicate with all stakeholders to manage expectations - I'm transparent about timelines and explain my prioritization rationale. I break down large tasks into smaller milestones and use time-blocking to ensure progress on multiple fronts. For example, in my current role, I was handling three major projects simultaneously. I created a shared dashboard showing progress and blockers, held weekly alignment meetings, and successfully delivered all projects on time by focusing on high-impact features first.",
      category: "situational",
      difficulty: "medium"
    },
    {
      question: "What would you do if you made a mistake that affected the team?",
      answer: "Show accountability, quick communication, problem-solving skills, and focus on solutions rather than blame.",
      exampleResponse: "If I made a mistake that affected the team, I would immediately take ownership. First, I would assess the impact and communicate transparently with my manager and affected team members - no hiding or downplaying the issue. Then I would focus on finding a solution, working overtime if necessary to fix the problem. I would also conduct a root cause analysis to understand how the mistake happened and implement safeguards to prevent recurrence. For instance, when I accidentally deployed a bug to production, I immediately rolled back the deployment, informed the team, worked through the weekend to fix and test thoroughly, and then implemented additional pre-deployment checks. I believe mistakes are learning opportunities when handled with accountability.",
      category: "situational",
      difficulty: "medium"
    },
    {
      question: "How would you handle a project that's falling behind schedule?",
      answer: "Discuss assessment, communication, prioritization, and collaborative problem-solving approaches.",
      exampleResponse: "When a project is falling behind, I would first conduct a rapid assessment to identify the root causes - is it scope creep, technical challenges, resource constraints, or unrealistic timelines? I would then bring the team together to brainstorm solutions and re-prioritize features based on the MVP approach. I would communicate proactively with stakeholders about the situation and our proposed plan, offering options like extending the timeline, reducing scope, or adding resources. I would implement daily stand-ups and visual project tracking to improve visibility. For example, on a delayed project last year, we identified that we were over-engineering certain features. We simplified the approach, focused on core functionality first, and delivered the main value on time while planning enhancements for phase 2.",
      category: "situational",
      difficulty: "hard"
    },
    {
      question: "What would you do if you didn't know how to complete a task?",
      answer: "Show resourcefulness, willingness to learn, and ability to seek help appropriately while taking initiative.",
      exampleResponse: "If I encountered a task I didn't know how to complete, I would first try to solve it independently by researching documentation, online resources, and similar projects. I'd allocate a reasonable time frame for self-learning - typically 2-4 hours depending on complexity. If I'm still stuck, I would reach out to team members who might have relevant experience, being specific about what I've tried and where I'm blocked. I would also consider if there are alternative approaches that might be more efficient. For example, when I needed to implement a complex authentication system, I first researched best practices, then consulted with our security expert, and finally proposed using a well-tested third-party solution rather than building from scratch. I believe knowing when to ask for help is a strength, not a weakness.",
      category: "situational",
      difficulty: "easy"
    }
  ]
};

const categoryIcons = {
  general: Users,
  behavioral: Target,
  technical: Lightbulb,
  situational: Briefcase
};

const categoryColors = {
  general: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300",
  behavioral: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
  technical: "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300",
  situational: "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300"
};

const difficultyColors = {
  easy: "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
  medium: "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800",
  hard: "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
};

const InterviewQuestions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedQuestions, setExpandedQuestions] = useState(new Set());

  const toggleQuestion = (index) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedQuestions(newExpanded);
  };

  const allQuestions = Object.entries(interviewQuestions).flatMap(([category, questions]) =>
    questions.map(q => ({ ...q, category }))
  );

  const filteredQuestions = allQuestions.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         q.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || q.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Navigation */}
      <nav className="border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Interview Questions
              </h1>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Master Your Interview
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Comprehensive collection of interview questions with expert answers to help you prepare and succeed
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search questions or answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className="flex items-center space-x-2"
            >
              <Users className="w-4 h-4" />
              <span>All Categories</span>
            </Button>
            {Object.entries(categoryIcons).map(([category, Icon]) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="flex items-center space-x-2 capitalize"
              >
                <Icon className="w-4 h-4" />
                <span>{category}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Questions Grid */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No questions found matching your criteria.</p>
            </div>
          ) : (
            filteredQuestions.map((item, index) => {
              const Icon = categoryIcons[item.category];
              const isExpanded = expandedQuestions.has(index);
              
              return (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-gray-700">
                  <div 
                    className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                    onClick={() => toggleQuestion(index)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                          <Badge className={categoryColors[item.category]}>
                            {item.category}
                          </Badge>
                          <Badge variant="outline" className={difficultyColors[item.difficulty]}>
                            {item.difficulty}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {item.question}
                        </h3>
                      </div>
                      <Button variant="ghost" size="sm">
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </Button>
                    </div>
                    
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                        {/* Tips Section */}
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Tips & Strategy</h4>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                        
                        {/* Example Response Section */}
                        <div className="flex items-start space-x-2">
                          <MessageSquare className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Example Response</h4>
                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                                {item.exampleResponse}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })
          )}
        </div>

        {/* Tips Section */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4">
              Pro Interview Tips 💡
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-blue-800 dark:text-blue-200">
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p>Research the company and role thoroughly before the interview</p>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p>Practice the STAR method for behavioral questions</p>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p>Prepare thoughtful questions to ask the interviewer</p>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p>Follow up with a thank-you email within 24 hours</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InterviewQuestions;
