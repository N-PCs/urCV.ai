import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ResumeData } from "@/pages/Builder";

interface HobbiesFormProps {
  data: ResumeData;
  updateData: (section: keyof ResumeData, data: any) => void;
}

const HobbiesForm = ({ data, updateData }: HobbiesFormProps) => {
  const [newHobby, setNewHobby] = useState("");

  const addHobby = () => {
    if (newHobby.trim()) {
      const currentHobbies = data.hobbies || [];
      const updatedHobbies = [...currentHobbies, newHobby.trim()];
      updateData("hobbies", updatedHobbies);
      setNewHobby("");
    }
  };

  const removeHobby = (index: number) => {
    const currentHobbies = data.hobbies || [];
    const updatedHobbies = currentHobbies.filter((_, i) => i !== index);
    updateData("hobbies", updatedHobbies);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 dark:bg-gray-800 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Hobbies & Interests
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {(data.hobbies || []).map((hobby, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-800 cursor-pointer"
              onClick={() => removeHobby(index)}
            >
              {hobby} ×
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newHobby}
            onChange={(e) => setNewHobby(e.target.value)}
            placeholder="Add a hobby (e.g., Photography, Hiking, Chess)"
            onKeyPress={(e) => e.key === "Enter" && addHobby()}
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-500"
          />
          <Button
            onClick={addHobby}
            className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
          >
            Add
          </Button>
        </div>
      </Card>

      <div className="text-sm text-gray-600 bg-indigo-50 dark:bg-indigo-900/30 dark:text-indigo-200 p-4 rounded-lg">
        <p className="font-medium mb-2">💡 Why add hobbies?</p>
        <p>
          Hobbies can show personality and soft skills. For example, team sports
          show teamwork, while chess might show strategic thinking.
        </p>
      </div>
    </div>
  );
};

export default HobbiesForm;