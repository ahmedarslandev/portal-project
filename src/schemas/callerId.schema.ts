import { z } from "zod";

export const callerIdValidation = z
  .string()
  .min(10, "Number is at least 10 characters long")
  .max(10, "Number is at most 10 characters long");

export const callerIdSchema = z.object({
  callerId: callerIdValidation,
});
