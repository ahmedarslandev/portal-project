import { z } from "zod";

export const tokenValidation = z.string();

export const tokenSchema = z.object({
  tokenValidation: tokenValidation,
});
