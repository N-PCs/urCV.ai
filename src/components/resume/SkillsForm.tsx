import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ResumeData } from "@/pages/Builder";

interface SkillsFormProps {
  data: ResumeData;
  updateData: (section: keyof ResumeData, data: any) => void;
}

const SkillsForm = ({ data, updateData }: SkillsFormProps) => {
  const [newSkill, setNewSkill] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [newCertification, setNewCertification] = useState("");

  const addSkill = (
    type: "technical" | "languages" | "certifications",
    value: string,
  ) => {
    if (value.trim()) {
      const updatedSkills = {
        ...data.skills,
        [type]: [...data.skills[type], value.trim()],
      };
      updateData("skills", updatedSkills);

      if (type === "technical") setNewSkill("");
      if (type === "languages") setNewLanguage("");
      if (type === "certifications") setNewCertification("");
    }
  };

  const removeSkill = (
    type: "technical" | "languages" | "certifications",
    index: number,
  ) => {
    const updatedSkills = {
      ...data.skills,
      [type]: data.skills[type].filter((_, i) => i !== index),
    };
    updateData("skills", updatedSkills);
  };

  return (
    <div className="space-y-6">
      {/* Technical Skills */}
      <Card className="p-6 dark:bg-gray-800 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Technical Skills
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {data.skills.technical.map((skill, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800 cursor-pointer"
              onClick={() => removeSkill("technical", index)}
            >
              {skill} ×
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a technical skill (e.g., React, Python, AWS)"
            onKeyPress={(e) =>
              e.key === "Enter" && addSkill("technical", newSkill)
            }
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-500"
          />
          <Button
            onClick={() => addSkill("technical", newSkill)}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            Add
          </Button>
        </div>
      </Card>

      {/* Languages */}
      <Card className="p-6 dark:bg-gray-800 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Languages
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {data.skills.languages.map((language, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800 cursor-pointer"
              onClick={() => removeSkill("languages", index)}
            >
              {language} ×
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newLanguage}
            onChange={(e) => setNewLanguage(e.target.value)}
            placeholder="Add a language (e.g., English - Native, Spanish - Conversational)"
            onKeyPress={(e) =>
              e.key === "Enter" && addSkill("languages", newLanguage)
            }
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-500"
          />
          <Button
            onClick={() => addSkill("languages", newLanguage)}
            className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
          >
            Add
          </Button>
        </div>
      </Card>

      {/* Certifications */}
      <Card className="p-6 dark:bg-gray-800 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Certifications
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {data.skills.certifications.map((cert, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-200 dark:hover:bg-purple-800 cursor-pointer"
              onClick={() => removeSkill("certifications", index)}
            >
              {cert} ×
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newCertification}
            onChange={(e) => setNewCertification(e.target.value)}
            placeholder="Add a certification (e.g., AWS Certified Solutions Architect)"
            onKeyPress={(e) =>
              e.key === "Enter" && addSkill("certifications", newCertification)
            }
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-500"
          />
          <Button
            onClick={() => addSkill("certifications", newCertification)}
            className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800"
          >
            Add
          </Button>
        </div>
      </Card>

      <div className="text-sm text-gray-600 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-200 p-4 rounded-lg">
        <p className="font-medium mb-2">💡 Pro Tips:</p>
        <ul className="space-y-1 text-sm">
          <li>• Click on any skill badge to remove it</li>
          <li>• Press Enter to quickly add skills</li>
          <li>
            • Include proficiency levels for languages (e.g., "Spanish -
            Fluent")
          </li>
          <li>• List your most relevant technical skills first</li>
        </ul>
      </div>
    </div>
  );
};

export default SkillsForm;