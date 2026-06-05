import { z } from "zod";

export const generateSchema = z.object({
  category: z.string().min(2, "Category is required"),
  description: z.string().min(5, "Description is required"),
  style: z.string().optional(),
});

export type GenerateRequest = z.infer<typeof generateSchema>;
