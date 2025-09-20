import { z } from "zod";

export const registrationSchema = z.object({
    name: z.string().min(2).max(50),
    time: z.string(),
    company: z.boolean().optional()
});

export type RegistrationSchema = typeof registrationSchema;