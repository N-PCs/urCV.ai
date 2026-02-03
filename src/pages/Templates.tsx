import { useState, useRef, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, ArrowLeft, Sparkles, TrendingUp, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/layout/Footer";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type Category =
  | "All"
  | "Professional"
  | "Creative"
  | "Executive"
  | "Minimalist"
  | "Bold";

interface Template {
  id: number;
  name: string;
  description: string;
  image: string;
  category: Category;
  type: string;
  color: string;
}

const templates: Template[] = [
  {
    id: 1,
    name: "Modern Professional",
    description: "Clean and modern design perfect for tech professionals",
    image: "/Resume1.webp",
    category: "Professional",
    type: "modern",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    name: "Creative Designer",
    description: "Eye-catching design for creative professionals",
    image: "/Resume2.jpg",
    category: "Creative",
    type: "creative",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    name: "Executive Standard",
    description: "Sophisticated template for senior executives",
    image: "/Resume3.jpg",
    category: "Executive",
    type: "professional",
    color: "from-gray-500 to-gray-700",
  },
  {
    id: 4,
    name: "Minimalist Clean",
    description: "Simple and elegant design focusing on content clarity",
    image: "/Resume4.jpg",
    category: "Minimalist",
    type: "minimalist",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: 5,
    name: "Bold Impact",
    description: "Strong, bold design that grabs recruiter attention",
    image: "/Resume5.jpg",
    category: "Bold",
    type: "bold",
    color: "from-red-500 to-orange-500",
  },
  {
    id: 6,
    name: "Tech Minimal Pro",
    description: "ATS-optimized minimal layout trusted by tech recruiters",
    image: "/Resume6.jpg",
    category: "Professional",
    type: "modern",
    color: "from-blue-600 to-indigo-600",
  },
  {
    id: 7,
    name: "Startup Impact",
    description: "Modern startup-style resume with strong visual hierarchy",
    image: "/Resume4.jpg",
    category: "Bold",
    type: "bold",
    color: "from-purple-600 to-pink-600",
  },
  {
    id: 8,
    name: "Elegant Executive",
    description: "High-end executive resume with clean typography",
    image: "/Resume5.jpg",
    category: "Executive",
    type: "professional",
    color: "from-emerald-500 to-teal-500",
  },
];

const categories: Category[] = [
  "All",
  "Professional",
  "Creative",
  "Executive",
  "Minimalist",
  "Bold",
];

const TemplateCard = ({
  template,
  index,
}: {
  template: Template;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Card className="overflow-hidden transition-all duration-500 border-0 dark:border dark:border-gray-800 shadow-xl group flex flex-col h-full dark:bg-gray-900 hover:shadow-2xl relative">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-10 pointer-events-none`}
        />

        <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
          <motion.img
            src={template.image}
            alt={template.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center backdrop-blur-[2px]"
          >
            <Link to="/builder">
              <Button className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-8 py-3 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Preview Template
              </Button>
            </Link>
          </motion.div>

          {index === 0 && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
              <TrendingUp className="w-3 h-3" />
              Trending
            </div>
          )}
        </div>

        <div className="p-6 flex-1 flex flex-col relative z-20">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {template.name}
            </h3>
            <span
              className={`text-xs px-2.5 py-1 bg-gradient-to-r ${template.color} text-white rounded-full font-medium shadow-sm`}
            >
              {template.category}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed flex-1">
            {template.description}
          </p>
          <Link to="/builder">
            <Button className="w-full bg-slate-900 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium shadow-md transition-all duration-300 group">
              <span className="flex items-center justify-center gap-2">
                Use This Template
                <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
};

const Templates = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(containerRef, { once: true });
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const filteredTemplates = useMemo(
    () =>
      selectedCategory === "All"
        ? templates
        : templates.filter((t) => t.category === selectedCategory),
    [selectedCategory]
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 font-sans transition-colors duration-300">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
                <img alt="logo" src="/websitelogo.png" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                urCV.ai
              </span>
            </Link>

            <div className="flex items-center space-x-4">
              <Link to="/" className="hidden sm:block">
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back Home</span>
                </Button>
              </Link>
              <ThemeToggle />
              <Link to="/builder">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                  <span className="relative z-10">Create Now</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      <div className="relative container mx-auto px-4 py-20 md:py-28 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/10 transition-colors duration-300 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
              }}
              animate={{
                opacity: [0, 0.3, 0],
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

        <div ref={containerRef} className="text-center mb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={
              isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold mb-6 tracking-wider uppercase shadow-md"
          >
            <Sparkles className="w-4 h-4" />
            Premium Collection
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={
              isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight"
          >
            Choose Your Perfect
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Resume Template
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={
              isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Select from our professionally designed templates and customize them
            to create your perfect resume
          </motion.p>
        </div>

        <div className="hidden md:flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full px-6 transition-all duration-300"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="md:hidden flex justify-center mb-8">
          <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="rounded-full px-6">
                <Menu className="w-4 h-4 mr-2" />
                Filter: {selectedCategory}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Categories</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2 mt-4">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsMobileFiltersOpen(false);
                    }}
                    className="justify-start px-6 transition-all duration-300"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 md:px-0 relative z-10">
          <AnimatePresence mode="popLayout">
            {filteredTemplates.map((template, index) => (
              <TemplateCard
                key={template.id}
                template={template}
                index={index}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-20">
            <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              No templates found
            </h3>
            <Button
              variant="link"
              onClick={() => setSelectedCategory("All")}
              className="text-blue-600"
            >
              Show all templates
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Templates;
