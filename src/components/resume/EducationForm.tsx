import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ResumeData } from "@/pages/Builder";
import { User } from "lucide-react";

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

  const addEducation = () => {
    if (newEducation.degree && newEducation.school) {
      const education = {
        id: Date.now().toString(),
        ...newEducation,
      };
      updateData("education", [...data.education, education]);
      setNewEducation({
        degree: "",
        school: "",
        location: "",
        graduationDate: "",
        gpa: "",
      });
    }
  };

  const removeEducation = (id: string) => {
    updateData(
      "education",
      data.education.filter((edu) => edu.id !== id),
    );
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
              <p className="text-sm text-gray-500">
                {edu.location} • {edu.graduationDate}
              </p>
              {edu.gpa && (
                <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeEducation(edu.id)}
              className="text-red-600 hover:text-red-700"
            >
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
              <Label htmlFor="degree">Degree</Label>
              <Input
                id="degree"
                value={newEducation.degree}
                onChange={(e) =>
                  setNewEducation({ ...newEducation, degree: e.target.value })
                }
                placeholder="Bachelor of Science in Computer Science"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="school">School</Label>
              <Input
                id="school"
                value={newEducation.school}
                onChange={(e) =>
                  setNewEducation({ ...newEducation, school: e.target.value })
                }
                placeholder="University of Technology"
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={newEducation.location}
                onChange={(e) =>
                  setNewEducation({ ...newEducation, location: e.target.value })
                }
                placeholder="Boston, MA"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="graduationDate">Graduation Date</Label>
              <Input
                id="graduationDate"
                value={newEducation.graduationDate}
                onChange={(e) =>
                  setNewEducation({
                    ...newEducation,
                    graduationDate: e.target.value,
                  })
                }
                placeholder="May 2024"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="gpa">GPA (Optional)</Label>
              <Input
                id="gpa"
                value={newEducation.gpa}
                onChange={(e) =>
                  setNewEducation({ ...newEducation, gpa: e.target.value })
                }
                placeholder="3.8"
                className="mt-1"
              />
            </div>
          </div>

          <Button
            onClick={addEducation}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add Education
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default EducationForm;
