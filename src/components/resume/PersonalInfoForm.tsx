
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ResumeData } from "@/pages/Builder";
import { useState, useEffect } from "react";
import { z } from "zod";

interface PersonalInfoFormProps {
  data: ResumeData;
  updateData: (section: keyof ResumeData, data: any) => void;
  setValid?: (isValid: boolean) => void;
}

const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  location: z.string().min(2, "Location is required"),
  linkedin: z.string().optional().or(z.string().url("Invalid LinkedIn URL").optional()),
  summary: z.string().min(50, "Summary should be at least 50 characters for better ATS results"),
});

const PersonalInfoForm = ({ data, updateData, setValid }: PersonalInfoFormProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const result = personalInfoSchema.safeParse(data.personalInfo);
    if (setValid) {
      setValid(result.success);
    }
  }, [data.personalInfo, setValid]);

  const handleInputChange = (field: string, value: string) => {
    updateData('personalInfo', {
      ...data.personalInfo,
      [field]: value
    });

    // Individual field validation
    try {
      const fieldSchema = (personalInfoSchema as any).shape[field];
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

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName" className={errors.fullName ? "text-red-500" : ""}>Full Name</Label>
          <Input
            id="fullName"
            value={data.personalInfo.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            placeholder="Alex Morgan"
            className={`mt-1 ${errors.fullName ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            required
          />
          {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
        </div>
        <div>
          <Label htmlFor="email" className={errors.email ? "text-red-500" : ""}>Email Address</Label>
          <Input
            id="email"
            type="email"
            value={data.personalInfo.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="alex.morgan@example.com"
            className={`mt-1 ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            required
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone" className={errors.phone ? "text-red-500" : ""}>Phone Number</Label>
          <Input
            id="phone"
            value={data.personalInfo.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="+1 (555) 012-3456"
            className={`mt-1 ${errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            required
          />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
        </div>
        <div>
          <Label htmlFor="location" className={errors.location ? "text-red-500" : ""}>Location</Label>
          <Input
            id="location"
            value={data.personalInfo.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="San Francisco, CA"
            className={`mt-1 ${errors.location ? "border-red-500 focus-visible:ring-red-500" : ""}`}
            required
          />
          {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="linkedin" className={errors.linkedin ? "text-red-500" : ""}>LinkedIn Profile</Label>
        <Input
          id="linkedin"
          value={data.personalInfo.linkedin}
          onChange={(e) => handleInputChange('linkedin', e.target.value)}
          placeholder="https://linkedin.com/in/alexmorgan"
          className={`mt-1 ${errors.linkedin ? "border-red-500 focus-visible:ring-red-500" : ""}`}
        />
        {errors.linkedin && <p className="text-xs text-red-500 mt-1">{errors.linkedin}</p>}
      </div>

      <div>
        <Label htmlFor="summary" className={errors.summary ? "text-red-500" : ""}>Professional Summary</Label>
        <Textarea
          id="summary"
          value={data.personalInfo.summary}
          onChange={(e) => handleInputChange('summary', e.target.value)}
          placeholder="Write a brief summary of your professional background and career objectives..."
          className={`mt-1 min-h-[120px] ${errors.summary ? "border-red-500 focus-visible:ring-red-500" : ""}`}
          required
        />
        {errors.summary && <p className="text-xs text-red-500 mt-1">{errors.summary}</p>}
      </div>
    </div>
  );
};

export default PersonalInfoForm;
