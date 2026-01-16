import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/layout/Footer";

const Templates = () => {
  const templates = [
    {
      id: 1,
      name: "Modern Professional",
      description: "Clean and modern design perfect for tech professionals",
      image: "/professional.png",
      category: "Professional",
      type: 'modern'
    },
    {
      id: 2,
      name: "Creative Designer",
      description: "Eye-catching design for creative professionals",
      image: "/designer.png",
      category: "Creative",
      type: 'creative'
    },
    {
      id: 3,
      name: "Executive Standard",
      description: "Sophisticated template for senior executives",
      image: "/executive.png",
      category: "Executive",
      type: 'professional'
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 font-sans transition-colors duration-300">
      {/* Navigation */}
      <nav className="border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <img alt="img" src="./websitelogo.png"/>
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                urCV.ai
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </Button>
              </Link>
              <ThemeToggle />
              <Link to="/builder">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all duration-200">
                  Create Resume
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="container mx-auto px-4 py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold mb-4 tracking-wider uppercase">
            Premium Collection
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            Choose Your Perfect
            <span className="text-blue-600 dark:text-blue-400"> Resume Template </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Select from our professionally designed templates and customize them to create your perfect resume
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto px-4 md:px-0">
          {templates.map((template) => (
            <Card key={template.id} className="overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 dark:border dark:border-gray-800 shadow-lg group flex flex-col h-full dark:bg-gray-900">
              <div className="aspect-[3/4] bg-gray-200 dark:bg-gray-800 relative overflow-hidden group-hover:shadow-inner">
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                  <Link to="/builder">
                    <Button className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-8 py-3 rounded-full">
                      Preview Template
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">{template.name}</h3>
                  <span className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full font-medium border border-blue-100 dark:border-blue-800">
                    {template.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{template.description}</p>
                <Link to="/builder">
                  <Button className="w-full bg-slate-900 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300">
                    Use This Template
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>


      </div>

      <Footer />
    </div>
  );
};

export default Templates;


