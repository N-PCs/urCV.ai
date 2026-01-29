import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ResumeData } from "@/pages/Builder";
import { User, Trash2, Plus } from "lucide-react";
import { z } from "zod";

const educationSchema = z.object({
  degree: z.string().min(2, "Degree is required"),
  school: z.string().min(2, "School name is required"),
  location: z.string().min(2, "Location is required"),
  graduationDate: z.string().min(4, "Graduation date is required"),
  gpa: z.string().optional(),
});

interface EducationFormProps {
  data: ResumeData;
  updateData: (section: keyof ResumeData, data: any) => void;
}

const EducationForm = ({ data, updateData }: EducationFormProps) => {
  const [newEducation, setNewEducation] = useState({
    degree: "",
    school: "",
    location: "",
    graduationDate: "",
    gpa: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: string) => {
    try {
      const fieldSchema = (educationSchema as any).shape[field];
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

  const handleInputChange = (field: string, value: string) => {
    setNewEducation({ ...newEducation, [field]: value });
    validateField(field, value);
  };

  const addEducation = () => {
    const result = educationSchema.safeParse(newEducation);
    if (result.success) {
      const education = {
        id: Date.now().toString(),
        ...newEducation,
      };
      updateData('education', [...data.education, education]);
      setNewEducation({
        degree: "",
        school: "",
        location: "",
        graduationDate: "",
        gpa: "",
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

  const removeEducation = (id: string) => {
    updateData('education', data.education.filter(edu => edu.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Existing Education */}
      {data.education.map((edu) => (
        <Card key={edu.id} className="p-4 border-l-4 border-l-blue-500">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
              <p className="text-gray-600">{edu.school}</p>
              <p className="text-sm text-gray-500">{edu.location} • {edu.graduationDate}</p>
              {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeEducation(edu.id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Remove
            </Button>
          </div>
        </Card>
      ))}

      {/* Add New Education */}
      <Card className="p-6 border-2 border-dashed border-gray-300">
        <div className="flex items-center space-x-2 mb-4">
          <User className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Add Education</h3>
        </div>

        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="degree" className={errors.degree ? "text-red-500" : ""}>Degree</Label>
              <Input
                id="degree"
                value={newEducation.degree}
                onChange={(e) => handleInputChange('degree', e.target.value)}
                placeholder="Bachelor of Science in Computer Science"
                className={`mt-1 ${errors.degree ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              />
              {errors.degree && <p className="text-xs text-red-500 mt-1">{errors.degree}</p>}
            </div>
            <div>
              <Label htmlFor="school" className={errors.school ? "text-red-500" : ""}>School</Label>
              <Input
                id="school"
                value={newEducation.school}
                onChange={(e) => handleInputChange('school', e.target.value)}
                placeholder="University of Technology"
                className={`mt-1 ${errors.school ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              />
              {errors.school && <p className="text-xs text-red-500 mt-1">{errors.school}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="location" className={errors.location ? "text-red-500" : ""}>Location</Label>
              <Input
                id="location"
                value={newEducation.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Boston, MA"
                className={`mt-1 ${errors.location ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              />
              {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
            </div>
            <div>
              <Label htmlFor="graduationDate" className={errors.graduationDate ? "text-red-500" : ""}>Graduation Date</Label>
              <Input
                id="graduationDate"
                value={newEducation.graduationDate}
                onChange={(e) => handleInputChange('graduationDate', e.target.value)}
                placeholder="May 2024"
                className={`mt-1 ${errors.graduationDate ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              />
              {errors.graduationDate && <p className="text-xs text-red-500 mt-1">{errors.graduationDate}</p>}
            </div>
            <div>
              <Label htmlFor="gpa">GPA (Optional)</Label>
              <Input
                id="gpa"
                value={newEducation.gpa}
                onChange={(e) => handleInputChange('gpa', e.target.value)}
                placeholder="3.8"
                className="mt-1"
              />
            </div>
          </div>

          <Button
            onClick={addEducation}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Education
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default EducationForm;
