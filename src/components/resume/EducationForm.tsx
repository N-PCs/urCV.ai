import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ResumeData } from "@/pages/Builder";
import { User, Edit2, Trash2, X, Check } from "lucide-react";

interface EducationFormProps {
  data: ResumeData;
  updateData: (section: keyof ResumeData, data: any) => void;
}

const EducationForm = ({ data, updateData }: EducationFormProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newEducation, setNewEducation] = useState({
    degree: "",
    school: "",
    location: "",
    graduationDate: "",
    gpa: "",
  });

  const resetForm = () => {
    setNewEducation({
      degree: "",
      school: "",
      location: "",
      graduationDate: "",
      gpa: "",
    });
    setEditingId(null);
  };

  const handleSubmit = () => {
    if (newEducation.degree && newEducation.school) {
      if (editingId) {
        // Update existing entry
        const updatedEducation = data.education.map((edu) =>
          edu.id === editingId ? { ...newEducation, id: editingId } : edu
        );
        updateData('education', updatedEducation);
      } else {
        // Add new entry
        const education = {
          id: Date.now().toString(),
          ...newEducation,
        };
        updateData('education', [...data.education, education]);
      }
      resetForm();
    }
  };

  const handleEdit = (edu: any) => {
    setEditingId(edu.id);
    setNewEducation({
      degree: edu.degree,
      school: edu.school,
      location: edu.location,
      graduationDate: edu.graduationDate,
      gpa: edu.gpa || "",
    });
  };

  const removeEducation = (id: string) => {
    updateData('education', data.education.filter(edu => edu.id !== id));
    if (editingId === id) {
      resetForm();
    }
  };

  return (
    <div className="space-y-6">
      {/* Existing Education */}
      <div className="space-y-4">
        {data.education.map((edu) => (
          <Card
            key={edu.id}
            className={`p-4 border-l-4 transition-all duration-200 dark:bg-gray-800 dark:border-gray-700 ${
              editingId === edu.id 
                ? 'border-l-blue-600 bg-blue-50/50 dark:bg-blue-900/20 shadow-md' 
                : 'border-l-green-500'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">{edu.degree}</h4>
                  {editingId === edu.id && (
                    <span className="text-[10px] bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">
                      Editing
                    </span>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-300 font-medium">{edu.school}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {edu.location} • {edu.graduationDate}
                </p>
                {edu.gpa && (
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-1">
                    GPA: {edu.gpa}
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-2 shrink-0 ml-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(edu)}
                  className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/50"
                  title="Edit entry"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeEducation(edu.id)}
                  className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/50"
                  title="Remove entry"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add/Edit Education Form */}
      <Card className={`p-6 border-2 border-dashed transition-colors duration-300 dark:bg-gray-800 dark:border-gray-700 ${
        editingId 
          ? 'border-blue-400 bg-blue-50/10 dark:border-blue-500 dark:bg-blue-900/10' 
          : 'border-gray-300'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <User className={`w-5 h-5 ${
              editingId 
                ? 'text-blue-600 dark:text-blue-400' 
                : 'text-blue-600 dark:text-blue-400'
            }`} />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {editingId ? 'Edit Education Detail' : 'Add Education'}
            </h3>
          </div>
          {editingId && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetForm}
              className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 text-xs flex items-center gap-1"
            >
              <X className="w-3 h-3" /> Cancel Edit
            </Button>
          )}
        </div>

        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label 
                htmlFor="degree" 
                className="text-sm font-medium dark:text-gray-300"
              >
                Degree / Field of Study
              </Label>
              <Input
                id="degree"
                value={newEducation.degree}
                onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                placeholder="e.g. B.S. in Computer Science"
                className="bg-white/50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-500"
              />
            </div>
            <div className="space-y-1.5">
              <Label 
                htmlFor="school" 
                className="text-sm font-medium dark:text-gray-300"
              >
                School / University
              </Label>
              <Input
                id="school"
                value={newEducation.school}
                onChange={(e) => setNewEducation({ ...newEducation, school: e.target.value })}
                placeholder="e.g. Stanford University"
                className="bg-white/50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label 
                htmlFor="location" 
                className="text-sm font-medium dark:text-gray-300"
              >
                Location
              </Label>
              <Input
                id="location"
                value={newEducation.location}
                onChange={(e) => setNewEducation({ ...newEducation, location: e.target.value })}
                placeholder="e.g. Boston, MA"
                className="bg-white/50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-500"
              />
            </div>
            <div className="space-y-1.5">
              <Label 
                htmlFor="graduationDate" 
                className="text-sm font-medium dark:text-gray-300"
              >
                Graduation Date
              </Label>
              <Input
                id="graduationDate"
                value={newEducation.graduationDate}
                onChange={(e) => setNewEducation({ ...newEducation, graduationDate: e.target.value })}
                placeholder="e.g. May 2024"
                className="bg-white/50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-500"
              />
            </div>
            <div className="space-y-1.5">
              <Label 
                htmlFor="gpa" 
                className="text-sm font-medium dark:text-gray-300"
              >
                GPA (Optional)
              </Label>
              <Input
                id="gpa"
                value={newEducation.gpa}
                onChange={(e) => setNewEducation({ ...newEducation, gpa: e.target.value })}
                placeholder="e.g. 3.8"
                className="bg-white/50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-500"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleSubmit}
              className={`flex-1 font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                editingId
                  ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white shadow-lg'
                  : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white'
              }`}
            >
              {editingId ? (
                <><Check className="w-4 h-4" /> Save Changes</>
              ) : (
                <>Add Education</>
              )}
            </Button>
            {editingId && (
              <Button
                variant="outline"
                onClick={resetForm}
                className="flex-1 border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-gray-300"
              >
                Discard Changes
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EducationForm;