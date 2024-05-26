import { z } from "zod";

export const emailValidation = z
  .string()
  .email({ message: "Please enter a valid email address" });

export const passwordValidation = z
  .string()
  .min(8, "password must be at least 8 characters long")
  .max(20, "password must no more than 15 characters");

export const loginSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});
