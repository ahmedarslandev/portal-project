import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(5, "username must be at least 5 characters long")
  .max(15, "username must no more than 15 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "username must not contain any special characters");

export const emailValidation = z
  .string()
  .email({ message: "Please enter a valid email address" });

export const signUpSchema = z.object({
  username: usernameValidation,
  email: emailValidation,
});
