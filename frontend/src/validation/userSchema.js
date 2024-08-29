import { z } from "zod";

const userSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(20, "Name length should be less than 20"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(/^\d+$/, "Phone number must contain only digits")
    .length(10, "Phone number must be exactly 10 digits"),
  address: z.string().optional(),
  highestQualification: z.string().min(1, "Highest qualification is required"),
  desiredJobRole: z.string().min(1, "Desired job role is required"),
  experience: z
    .string()
    .min(1, "Experience is required")
    .regex(/^\d+$/, "CTC must contain only digits"),
  expectedCTC: z
    .string()
    .min(1, "Expected CTC is required")
    .regex(/^\d+$/, "CTC must contain only digits"),
  resume: z
    .any()
    .refine(
      (file) =>
        file &&
        [
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type),
      "Resume must be a PDF or DOCX file"
    ),

  coverLetter: z.string().optional(),
  githubProfile: z.string().optional(),
  portfolioWebsite: z.string().optional(),
});

export default userSchema;
