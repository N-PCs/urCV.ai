import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { ResumeData } from "@/pages/Builder";
import { User, Edit2, Trash2, X, Check } from "lucide-react";

interface ExperienceFormProps {
  data: ResumeData;
  updateData: (section: keyof ResumeData, data: any) => void;
}

const ExperienceForm = ({ data, updateData }: ExperienceFormProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  });

  const resetForm = () => {
    setNewExperience({
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    });
    setEditingId(null);
  };

  const handleSubmit = () => {
    if (newExperience.title && newExperience.company) {
      if (editingId) {
        // Update existing entry
        const updatedExperience = data.experience.map((exp) =>
          exp.id === editingId ? { ...newExperience, id: editingId } : exp
        );
        updateData('experience', updatedExperience);
      } else {
        // Add new entry
        const experience = {
          id: Date.now().toString(),
          ...newExperience,
        };
        updateData('experience', [...data.experience, experience]);
      }
      resetForm();
    }
  };

  const handleEdit = (exp: any) => {
    setEditingId(exp.id);
    setNewExperience({
      title: exp.title,
      company: exp.company,
      location: exp.location,
      startDate: exp.startDate,
      endDate: exp.endDate,
      current: exp.current,
      description: exp.description,
    });
  };

  const removeExperience = (id: string) => {
    updateData('experience', data.experience.filter(exp => exp.id !== id));
    if (editingId === id) {
      resetForm();
    }
  };

  return (
    <div className="space-y-6">
      {/* Existing Experience */}
      <div className="space-y-4">
        {data.experience.map((exp) => (
          <Card
            key={exp.id}
            className={`p-4 border-l-4 transition-all duration-200 dark:bg-gray-800 dark:border-gray-700 ${
              editingId === exp.id 
                ? 'border-l-blue-600 bg-blue-50/50 dark:bg-blue-900/20 shadow-md' 
                : 'border-l-purple-500'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">{exp.title}</h4>
                  {editingId === exp.id && (
                    <span className="text-[10px] bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">
                      Editing
                    </span>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-300 font-medium">{exp.company}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {exp.location} • {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                </p>
                {exp.description && (
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 line-clamp-2">
                    {exp.description}
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-2 shrink-0 ml-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(exp)}
                  className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/50"
                  title="Edit entry"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeExperience(exp.id)}
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

      {/* Add/Edit Experience Form */}
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
                : 'text-purple-600 dark:text-purple-400'
            }`} />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {editingId ? 'Edit Professional Experience' : 'Add Experience'}
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
                htmlFor="title" 
                className="text-sm font-medium dark:text-gray-300"
              >
                Job Title
              </Label>
              <Input
                id="title"
                value={newExperience.title}
                onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                placeholder="e.g. Software Engineer"
                className="bg-white/50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-500"
              />
            </div>
            <div className="space-y-1.5">
              <Label 
                htmlFor="company" 
                className="text-sm font-medium dark:text-gray-300"
              >
                Company
              </Label>
              <Input
                id="company"
                value={newExperience.company}
                onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                placeholder="e.g. Google"
                className="bg-white/50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label 
              htmlFor="location" 
              className="text-sm font-medium dark:text-gray-300"
            >
              Location
            </Label>
            <Input
              id="location"
              value={newExperience.location}
              onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })}
              placeholder="e.g. San Francisco, CA"
              className="bg-white/50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-500"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label 
                htmlFor="startDate" 
                className="text-sm font-medium dark:text-gray-300"
              >
                Start Date
              </Label>
              <Input
                id="startDate"
                value={newExperience.startDate}
                onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                placeholder="e.g. Jan 2022"
                className="bg-white/50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-500"
              />
            </div>
            <div className="space-y-1.5">
              <Label 
                htmlFor="endDate" 
                className="text-sm font-medium dark:text-gray-300"
              >
                End Date
              </Label>
              <Input
                id="endDate"
                value={newExperience.endDate}
                onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                placeholder="e.g. Present"
                disabled={newExperience.current}
                className="bg-white/50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-500 disabled:opacity-50"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 py-1">
            <Checkbox
              id="current"
              checked={newExperience.current}
              onCheckedChange={(checked) => setNewExperience({ ...newExperience, current: checked as boolean })}
              className="data-[state=checked]:bg-blue-600 border-blue-600 dark:border-blue-500 dark:data-[state=checked]:bg-blue-700"
            />
            <Label 
              htmlFor="current" 
              className="text-sm cursor-pointer select-none dark:text-gray-300"
            >
              I currently work here
            </Label>
          </div>

          <div className="space-y-1.5">
            <Label 
              htmlFor="description" 
              className="text-sm font-medium dark:text-gray-300"
            >
              Job Description
            </Label>
            <Textarea
              id="description"
              value={newExperience.description}
              onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
              placeholder="Highlight your key achievements and responsibilities..."
              className="min-h-[120px] bg-white/50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-500 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleSubmit}
              className={`flex-1 font-semibold transition-all duration-300 flex items-center gap-2 ${
                editingId
                  ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white shadow-lg'
                  : 'bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 text-white'
              }`}
            >
              {editingId ? (
                <><Check className="w-4 h-4" /> Save Changes</>
              ) : (
                <>Add Experience</>
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

export default ExperienceForm;
