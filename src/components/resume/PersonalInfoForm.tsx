
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ResumeData } from "@/pages/Builder";
import { personalInfoSchema, PersonalInfoValues } from "@/lib/validations";

interface PersonalInfoFormProps {
  data: ResumeData;
  updateData: (section: keyof ResumeData, data: any) => void;
  setIsValid?: (isValid: boolean) => void;
}

const PersonalInfoForm = ({ data, updateData, setIsValid }: PersonalInfoFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    trigger,
  } = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: data.personalInfo,
    mode: "onChange", // Validate on change for immediate feedback
  });

  // Watch for changes and update the parent state
  const watchedFields = watch();

  useEffect(() => {
    updateData('personalInfo', watchedFields);
  }, [watchedFields, updateData]);

  useEffect(() => {
    if (setIsValid) {
      setIsValid(isValid);
    }
  }, [isValid, setIsValid]);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName" className={errors.fullName ? "text-red-500" : ""}>Full Name</Label>
          <Input
            id="fullName"
            {...register("fullName")}
            placeholder="Alex Morgan"
            className={`mt-1 ${errors.fullName ? "border-red-500 focus-visible:ring-red-500" : ""}`}
          />
          {errors.fullName && (
            <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className={errors.email ? "text-red-500" : ""}>Email Address</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            placeholder="alex.morgan@example.com"
            className={`mt-1 ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone" className={errors.phone ? "text-red-500" : ""}>Phone Number</Label>
          <Input
            id="phone"
            {...register("phone")}
            placeholder="+1 (555) 012-3456"
            className={`mt-1 ${errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}`}
          />
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="location" className={errors.location ? "text-red-500" : ""}>Location</Label>
          <Input
            id="location"
            {...register("location")}
            placeholder="San Francisco, CA"
            className={`mt-1 ${errors.location ? "border-red-500 focus-visible:ring-red-500" : ""}`}
          />
          {errors.location && (
            <p className="text-xs text-red-500 mt-1">{errors.location.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="linkedin" className={errors.linkedin ? "text-red-500" : ""}>LinkedIn Profile</Label>
        <Input
          id="linkedin"
          {...register("linkedin")}
          placeholder="linkedin.com/in/alexmorgan"
          className={`mt-1 ${errors.linkedin ? "border-red-500 focus-visible:ring-red-500" : ""}`}
        />
        {errors.linkedin && (
          <p className="text-xs text-red-500 mt-1">{errors.linkedin.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary" className={errors.summary ? "text-red-500" : ""}>Professional Summary</Label>
        <Textarea
          id="summary"
          {...register("summary")}
          placeholder="Write a brief summary of your professional background and career objectives..."
          className={`mt-1 min-h-[120px] ${errors.summary ? "border-red-500 focus-visible:ring-red-500" : ""}`}
        />
        {errors.summary && (
          <p className="text-xs text-red-500 mt-1">{errors.summary.message}</p>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoForm;
