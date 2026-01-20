import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { ResumeData } from "@/pages/Builder";
import { User } from "lucide-react";

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

  const addExperience = () => {
    if (newExperience.title && newExperience.company) {
      const experience = {
        id: Date.now().toString(),
        ...newExperience,
      };
      updateData("experience", [...data.experience, experience]);
      setNewExperience({
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      });
    }
  };

  const removeExperience = (id: string) => {
    updateData(
      "experience",
      data.experience.filter((exp) => exp.id !== id),
    );
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
                {exp.location} • {exp.startDate} -{" "}
                {exp.current ? "Present" : exp.endDate}
              </p>
              {exp.description && (
                <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeExperience(exp.id)}
              className="text-red-600 hover:text-red-700"
            >
              Remove
            </Button>
          </div>
        </Card>
      ))}

      {/* Add New Experience */}
      <Card className="p-6 border-2 border-dashed border-gray-300">
        <div className="flex items-center space-x-2 mb-4">
          <User className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Add Experience
          </h3>
        </div>

        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                value={newExperience.title}
                onChange={(e) =>
                  setNewExperience({ ...newExperience, title: e.target.value })
                }
                placeholder="Software Engineer"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={newExperience.company}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    company: e.target.value,
                  })
                }
                placeholder="Tech Corp"
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={newExperience.location}
              onChange={(e) =>
                setNewExperience({ ...newExperience, location: e.target.value })
              }
              placeholder="San Francisco, CA"
              className="mt-1"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                value={newExperience.startDate}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    startDate: e.target.value,
                  })
                }
                placeholder="January 2023"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                value={newExperience.endDate}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    endDate: e.target.value,
                  })
                }
                placeholder="December 2023"
                disabled={newExperience.current}
                className="mt-1"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="current"
              checked={newExperience.current}
              onCheckedChange={(checked) =>
                setNewExperience({
                  ...newExperience,
                  current: checked as boolean,
                })
              }
            />
            <Label htmlFor="current" className="text-sm">
              I currently work here
            </Label>
          </div>

          <div>
            <Label htmlFor="description">Job Description</Label>
            <Textarea
              id="description"
              value={newExperience.description}
              onChange={(e) =>
                setNewExperience({
                  ...newExperience,
                  description: e.target.value,
                })
              }
              placeholder="Describe your responsibilities and achievements..."
              className="mt-1 min-h-[100px]"
            />
          </div>

          <Button
            onClick={addExperience}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            Add Experience
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ExperienceForm;
