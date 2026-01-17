import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/layout/Footer";

type JobRole =
  | "all"
  | "software"
  | "designer"
  | "data"
  | "product"
  | "executive";

type Category =
  | "All"
  | "Professional"
  | "Creative"
  | "Executive"
  | "Minimalist"
  | "Bold";

const Templates = () => {
  const [selectedRole, setSelectedRole] = useState<JobRole>("all");
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  const templates = [
    {
      id: 1,
      name: "Modern Professional",
      description: "Clean and modern design perfect for tech professionals",
      image: "/Resume1.webp",
      category: "Professional",
      roles: ["software", "data", "product"],
      type: "modern",
    },
    {
      id: 2,
      name: "Creative Designer",
      description: "Eye-catching design for creative professionals",
      image: "Resume2.jpg",
      category: "Creative",
      roles: ["designer"],
      type: "creative",
    },
    {
      id: 3,
      name: "Executive Standard",
      description: "Sophisticated template for senior executives",
      image: "/Resume3.jpg",
      category: "Executive",
      roles: ["executive", "product"],
      type: "professional",
    },
    {
      id: 4,
      name: "Minimalist Clean",
      description: "Simple and elegant design focusing on content clarity",
      image: "/Resume1.webp",
      category: "Minimalist",
      roles: ["software", "data"],
      type: "minimalist",
    },
    {
      id: 5,
      name: "Bold Impact",
      description: "Strong, bold design that grabs recruiter attention",
      image: "/Resume2.jpg",
      category: "Bold",
      roles: ["designer", "product"],
      type: "bold",
    },
    {
  id: 6,
  name: "Tech Minimal Pro",
  description: "ATS-optimized minimal layout trusted by tech recruiters",
  image: "/Resume3.jpg",
  category: "Professional",
  roles: ["software", "data"],
  type: "modern",
},
{
  id: 7,
  name: "Startup Impact",
  description: "Modern startup-style resume with strong visual hierarchy",
  image: "/Resume4.jpg",
  category: "Bold",
  roles: ["product", "software"],
  type: "bold",
},
{
  id: 8,
  name: "Elegant Executive",
  description: "High-end executive resume with clean typography",
  image: "/Resume5.jpg",
  category: "Executive",
  roles: ["executive"],
  type: "professional",
},
{
  id: 9,
  name: "UX Portfolio Resume",
  description: "Creative layout designed for UI/UX and visual designers",
  image: "/Resume4.jpg",
  category: "Creative",
  roles: ["designer"],
  type: "creative",
},
{
  id: 10,
  name: "Data Focused",
  description: "Designed for data analysts with skills & metrics emphasis",
  image: "/Resume5.jpg",
  category: "Professional",
  roles: ["data"],
  type: "modern",
},
{
  id: 11,
  name: "FAANG Classic",
  description: "Simple, recruiter-approved format for top tech companies",
  image: "/Resume6.jpg",
  category: "Minimalist",
  roles: ["software", "data"],
  type: "minimalist",
},
{
  id: 12,
  name: "Creative Bold Grid",
  description: "Bold grid-based layout for modern creative professionals",
  image: "/Resume1.webp",
  category: "Bold",
  roles: ["designer", "product"],
  type: "bold",
},
{
  id: 13,
  name: "Consulting Elite",
  description: "Structured layout ideal for consulting & strategy roles",
  image: "/Resume3.jpg",
  category: "Professional",
  roles: ["product", "executive"],
  type: "professional",
},

  ];

  const filteredTemplates = templates.filter((template) => {
    const roleMatch =
      selectedRole === "all" || template.roles.includes(selectedRole);
    const categoryMatch =
      selectedCategory === "All" || template.category === selectedCategory;
    return roleMatch && categoryMatch;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Navigation */}
      <nav className="border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <img src="./websitelogo.png" alt="logo" className="w-8 h-8" />
            <span className="text-2xl font-bold">urCV.ai</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            </Link>
            <ThemeToggle />
            <Link to="/builder">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Create Resume
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Choose Your Perfect{" "}
            <span className="text-blue-600">Resume Template</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Filter templates by job role and category to find the best match for
            your career.
          </p>

          {/* Job Role Filter */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              ["all", "All Roles"],
              ["software", "Software"],
              ["designer", "Designer"],
              ["data", "Data"],
              ["product", "Product"],
              ["executive", "Executive"],
            ].map(([value, label]) => (
              <Button
                key={value}
                variant={selectedRole === value ? "default" : "outline"}
                onClick={() => setSelectedRole(value as JobRole)}
              >
                {label}
              </Button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {[
              "All",
              "Professional",
              "Creative",
              "Executive",
              "Minimalist",
              "Bold",
            ].map((cat) => (
              <Button
                key={cat}
                size="sm"
                variant={selectedCategory === cat ? "default" : "ghost"}
                onClick={() => setSelectedCategory(cat as Category)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="container mx-auto px-4 py-16">
        {filteredTemplates.length === 0 ? (
          <p className="text-center text-gray-500">
            No templates match your selection.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTemplates.map((template) => (
              <Card
                key={template.id}
                className="overflow-hidden hover:shadow-2xl transition-all group"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg">{template.name}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                      {template.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {template.description}
                  </p>
                  <Link to="/builder">
                    <Button className="w-full bg-slate-900 text-white hover:bg-blue-600">
                      Use This Template
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Templates;
