import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, ArrowLeft, Sparkles, TrendingUp, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/layout/Footer";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

type Category =
  | "All"
  | "Professional"
  | "Creative"
  | "Executive"
  | "Minimalist"
  | "Bold";

const Templates = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const templates = [
    {
      id: 1,
      name: "Modern Professional",
      description: "Clean and modern design perfect for tech professionals",
      image: "/Resume1.webp",
      category: "Professional" as Category,
      type: "modern",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      name: "Creative Designer",
      description: "Eye-catching design for creative professionals",
      image: "/Resume2.jpg",
      category: "Creative" as Category,
      type: "creative",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      name: "Executive Standard",
      description: "Sophisticated template for senior executives",
      image: "/Resume3.jpg",
      category: "Executive" as Category,
      type: "professional",
      color: "from-gray-500 to-gray-700",
    },
    {
      id: 4,
      name: "Minimalist Clean",
      description: "Simple and elegant design focusing on content clarity",
      image: "/Resume4.jpg",
      category: "Minimalist" as Category,
      type: "minimalist",
      color: "from-emerald-500 to-teal-500",
    },
    {
      id: 5,
      name: "Bold Impact",
      description: "Strong, bold design that grabs recruiter attention",
      image: "/Resume5.jpg",
      category: "Bold" as Category,
      type: "bold",
      color: "from-red-500 to-orange-500",
    },
    {
      id: 6,
      name: "Tech Minimal Pro",
      description: "ATS-optimized minimal layout trusted by tech recruiters",
      image: "/Resume6.jpg",
      category: "Professional" as Category,
      type: "modern",
      color: "from-blue-600 to-indigo-600",
    },
    {
      id: 7,
      name: "Startup Impact",
      description: "Modern startup-style resume with strong visual hierarchy",
      image: "/Resume4.jpg",
      category: "Bold" as Category,
      type: "bold",
      color: "from-purple-600 to-pink-600",
    },
    {
      id: 8,
      name: "Elegant Executive",
      description: "High-end executive resume with clean typography",
      image: "/Resume5.jpg",
      category: "Executive" as Category,
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

  const filteredTemplates =
    selectedCategory === "All"
      ? templates
      : templates.filter((template) => template.category === selectedCategory);

  // TemplateCard Component
  const TemplateCard = ({
    template,
    index,
  }: {
    template: (typeof templates)[0];
    index: number;
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
          delay: index * 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Card className="overflow-hidden transition-all duration-500 border-0 dark:border dark:border-gray-800 shadow-xl group flex flex-col h-full dark:bg-gray-900 hover:shadow-2xl relative">
          {/* Gradient overlay on hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-10 pointer-events-none`}
          />

          {/* Image Container */}
          <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
            <motion.img
              src={template.image}
              alt={template.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />

            {/* Overlay on hover */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center backdrop-blur-[2px]"
            >
              <Link to="/builder">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileHover={{ scale: 1 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Button className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-8 py-3 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                    Preview Template
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Trending badge for first template */}
            {index === 0 && (
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg"
              >
                <TrendingUp className="w-3 h-3" />
                Trending
              </motion.div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col relative z-20">
            <div className="flex items-center justify-between mb-3">
              <motion.h3
                className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                {template.name}
              </motion.h3>
              <motion.span
                whileHover={{ scale: 1.1 }}
                className={`text-xs px-2.5 py-1 bg-gradient-to-r ${template.color} text-white rounded-full font-medium shadow-sm`}
              >
                {template.category}
              </motion.span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed flex-1">
              {template.description}
            </p>
            <Link to="/builder">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button className="w-full bg-gradient-to-r from-slate-900 to-slate-800 dark:from-blue-600 dark:to-blue-700 hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Use This Template
                    <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </Button>
              </motion.div>
            </Link>
          </div>

          {/* Decorative corner */}
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-gray-100 dark:from-gray-800 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tl-full" />
        </Card>
      </motion.div>
    );
  };

  // Mobile filter button component
  const MobileFilterButton = () => (
    <Button
      variant="outline"
      className="md:hidden"
      onClick={() => setIsMobileFiltersOpen(true)}
    >
      <Menu className="w-4 h-4 mr-2" />
      Filters
    </Button>
  );

  // Mobile filters sheet
  const MobileFiltersSheet = () => (
    <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
      <SheetContent side="right" className="w-[80vw] sm:w-[400px]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Filters</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileFiltersOpen(false)}
          >
            Close
          </Button>
        </div>
        <div className="space-y-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => {
                setSelectedCategory(category);
                setIsMobileFiltersOpen(false);
              }}
            >
              {category}
              {selectedCategory === category && (
                <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
                  Selected
                </span>
              )}
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 font-sans transition-colors duration-300">
      {/* Animated Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.div
                transition={{ duration: 0.6 }}
                className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden"
              >
                <img alt="logo" src="./websitelogo.png" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                urCV.ai
              </span>
            </Link>

            <div className="flex items-center space-x-1">
              <Link to="/">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-300"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                </motion.div>
              </Link>
              <ThemeToggle />
              <MobileFilterButton />
              <Link to="/builder">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                    <span className="relative z-10">Create</span>
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    />
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Header with Parallax Effect */}
      <div className="relative container mx-auto px-4 py-20 md:py-28 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/10 transition-colors duration-300 overflow-hidden">
        {/* Animated background elements */}
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

        <div ref={headerRef} className="text-center mb-16 relative z-10">
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
            <motion.span
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "200% 50%" }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
              style={{ backgroundSize: "200% 100%" }}
            >
              Resume Template
            </motion.span>
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

        {/* Category Filter - Desktop */}
        <div className="hidden md:flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="relative overflow-hidden group"
            >
              {category}
              {selectedCategory === category && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
                  Selected
                </span>
              )}
            </Button>
          ))}
        </div>

        {/* Category Filter - Mobile Indicator */}
        <div className="md:hidden flex items-center justify-center mb-8">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Filter:
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMobileFiltersOpen(true)}
              className="flex items-center gap-2"
            >
              {selectedCategory}
              {selectedCategory !== "All" && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
                  Active
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 md:px-0 relative z-10">
          {filteredTemplates.map((template, index) => (
            <TemplateCard key={template.id} template={template} index={index} />
          ))}
        </div>

        {/* No Results Message */}
        {filteredTemplates.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <FileText className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No templates found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try selecting a different category
            </p>
            <Button
              variant="outline"
              onClick={() => setSelectedCategory("All")}
            >
              Reset Filters
            </Button>
          </motion.div>
        )}

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
      </div>

      {/* Mobile Filters Sheet */}
      <MobileFiltersSheet />

      <Footer />
    </div>
  );
};

export default Templates;
