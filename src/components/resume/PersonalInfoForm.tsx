
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ResumeData } from "@/pages/Builder";

interface PersonalInfoFormProps {
  data: ResumeData;
  updateData: (section: keyof ResumeData, data: any) => void;
}

const PersonalInfoForm = ({ data, updateData }: PersonalInfoFormProps) => {
  const handleInputChange = (field: string, value: string) => {
    updateData('personalInfo', {
      ...data.personalInfo,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={data.personalInfo.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            placeholder="John Doe"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={data.personalInfo.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="john@example.com"
            className="mt-1"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={data.personalInfo.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={data.personalInfo.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="New York, NY"
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="linkedin">LinkedIn Profile</Label>
        <Input
          id="linkedin"
          value={data.personalInfo.linkedin}
          onChange={(e) => handleInputChange('linkedin', e.target.value)}
          placeholder="linkedin.com/in/johndoe"
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          value={data.personalInfo.summary}
          onChange={(e) => handleInputChange('summary', e.target.value)}
          placeholder="Write a brief summary of your professional background and career objectives..."
          className="mt-1 min-h-[120px]"
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;
