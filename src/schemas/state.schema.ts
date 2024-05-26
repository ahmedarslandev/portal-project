import { z } from "zod";

export const stateNameValidation = z.string().min(3, "Invalid StateName");

export const areaCodeValidation = z
  .string()
  .min(3, "Invalid StateName")
  .max(5, "Invalid AreaCode");

export const callerIdSchema = z.object({
  stateName: stateNameValidation,
  code: areaCodeValidation,
});
