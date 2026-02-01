import * as z from "zod";

export const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  location: z.string().min(2, "Location is required"),
  linkedin: z.string().optional().or(z.literal("")),
  summary: z.string().min(50, "Summary should be at least 50 characters for better results"),
});

export const experienceSchema = z.object({
  title: z.string().min(2, "Job title is required"),
  company: z.string().min(2, "Company name is required"),
  location: z.string().min(2, "Location is required"),
  startDate: z.string().min(2, "Start date is required"),
  endDate: z.string().optional().or(z.literal("")),
  current: z.boolean().default(false),
  description: z.string().min(10, "Description should be more detailed"),
}).refine((data) => data.current || data.endDate, {
  message: "End date is required if not currently working here",
  path: ["endDate"],
});

export const educationSchema = z.object({
  degree: z.string().min(2, "Degree is required"),
  school: z.string().min(2, "School/University is required"),
  location: z.string().min(2, "Location is required"),
  graduationDate: z.string().min(2, "Graduation date is required"),
  gpa: z.string().optional().or(z.literal("")),
});

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;
export type ExperienceValues = z.infer<typeof experienceSchema>;
export type EducationValues = z.infer<typeof educationSchema>;
