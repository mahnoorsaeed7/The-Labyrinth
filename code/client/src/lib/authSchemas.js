import { email, z } from "zod";

export const registerSchema = z.object({
  username: z
   .string()
   .min(3, "Username must be at least 3 Characters")
   .max(20, "Username must be at less than 20 Characters")
   .trim(),
  email: z
    .string()
    .email("Invalid email address")
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(6, "Password must be at least 8 characters")
    .max(100, "Password is too long"),
  
});

export const loginSchema = z.object({
   email: z
    .string()
    .email("Invalid email address")
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(4, "Password is required")
    
});