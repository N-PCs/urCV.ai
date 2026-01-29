import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { ResumeData } from "@/pages/Builder";
import { User, Trash2, Plus } from "lucide-react";
import { z } from "zod";

const experienceSchema = z.object({
  title: z.string().min(2, "Job title is required"),
  company: z.string().min(2, "Company name is required"),
  location: z.string().min(2, "Location is required"),
  startDate: z.string().min(4, "Start date is required"),
  current: z.boolean(),
  endDate: z.string().optional(),
  description: z.string().min(20, "Description should be more detailed for better ATS results"),
}).refine((data) => {
  if (!data.current && !data.endDate) {
    return false;
  }
  return true;
}, {
  message: "End date is required if this is not your current job",
  path: ["endDate"],
});

interface ExperienceFormProps {
  data: ResumeData;
  updateData: (section: keyof ResumeData, data: any) => void;
}

const ExperienceForm = ({ data, updateData }: ExperienceFormProps) => {
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: any) => {
    try {
      const fieldSchema = (experienceSchema as any).shape[field];
      if (fieldSchema) {
        fieldSchema.parse(value);
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    } catch (err: unknown) {
      if (err instanceof z.ZodError) {
        setErrors(prev => ({
          ...prev,
          [field]: err.errors[0].message
        }));
      }
    }
  };

  const handleInputChange = (field: string, value: any) => {
    const updated = { ...newExperience, [field]: value };
    setNewExperience(updated);
    validateField(field, value);
  };

  const addExperience = () => {
    const result = experienceSchema.safeParse(newExperience);
    if (result.success) {
      const experience = {
        id: Date.now().toString(),
        ...newExperience,
      };
      updateData('experience', [...data.experience, experience]);
      setNewExperience({
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      });
      setErrors({});
    } else {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(newErrors);
    }
  };

  const removeExperience = (id: string) => {
    updateData('experience', data.experience.filter(exp => exp.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Existing Experience */}
      {data.experience.map((exp) => (
        <Card key={exp.id} className="p-4 border-l-4 border-l-purple-500">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">{exp.title}</h4>
              <p className="text-gray-600">{exp.company}</p>
              <p className="text-sm text-gray-500">
                {exp.location} • {exp.startDate} - {exp.current ? "Present" : exp.endDate}
              </p>
              {exp.description && (
                <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeExperience(exp.id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Remove
            </Button>
          </div>
        </Card>
      ))}

      {/* Add New Experience */}
      <Card className="p-6 border-2 border-dashed border-gray-300">
        <div className="flex items-center space-x-2 mb-4">
          <User className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">Add Experience</h3>
        </div>

        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title" className={errors.title ? "text-red-500" : ""}>Job Title</Label>
              <Input
                id="title"
                value={newExperience.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Software Engineer"
                className={`mt-1 ${errors.title ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              />
              {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
            </div>
            <div>
              <Label htmlFor="company" className={errors.company ? "text-red-500" : ""}>Company</Label>
              <Input
                id="company"
                value={newExperience.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="Tech Corp"
                className={`mt-1 ${errors.company ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              />
              {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="location" className={errors.location ? "text-red-500" : ""}>Location</Label>
            <Input
              id="location"
              value={newExperience.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="San Francisco, CA"
              className={`mt-1 ${errors.location ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            />
            {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate" className={errors.startDate ? "text-red-500" : ""}>Start Date</Label>
              <Input
                id="startDate"
                value={newExperience.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                placeholder="January 2023"
                className={`mt-1 ${errors.startDate ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              />
              {errors.startDate && <p className="text-xs text-red-500 mt-1">{errors.startDate}</p>}
            </div>
            <div>
              <Label htmlFor="endDate" className={errors.endDate ? "text-red-500" : ""}>End Date</Label>
              <Input
                id="endDate"
                value={newExperience.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                placeholder="December 2023"
                disabled={newExperience.current}
                className={`mt-1 ${errors.endDate ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              />
              {errors.endDate && <p className="text-xs text-red-500 mt-1">{errors.endDate}</p>}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="current"
              checked={newExperience.current}
              onCheckedChange={(checked) => handleInputChange('current', checked as boolean)}
            />
            <Label htmlFor="current" className="text-sm">
              I currently work here
            </Label>
          </div>

          <div>
            <Label htmlFor="description" className={errors.description ? "text-red-500" : ""}>Job Description</Label>
            <Textarea
              id="description"
              value={newExperience.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your responsibilities and achievements..."
              className={`mt-1 min-h-[100px] ${errors.description ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            />
            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
          </div>

          <Button
            onClick={addExperience}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Experience
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ExperienceForm;
