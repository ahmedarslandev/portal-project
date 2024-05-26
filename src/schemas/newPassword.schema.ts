import { z } from "zod";

export const passwordValidation = z
  .string()
  .min(8, "password must be at least 8 characters long")
  .max(20, "password must no more than 15 characters");

export const confirmPasswordValidation = z
  .string()
  .min(8, "password must be at least 8 characters long")
  .max(20, "password must no more than 15 characters");

export const newPasswordSchema = z.object({
  confirmPassword: confirmPasswordValidation,
  password: passwordValidation,
});
