import { z } from "zod";

const TimeEnum = ["12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"] as const;

export const registrationSchema = z.object({
    name: z.string().min(2, "Name must be longer than a single character!").max(12, "Name must be less than 12 characters!"),
    time: z.enum(TimeEnum).default("12:00"),
    company: z.boolean().default(false),
});

export type RegistrationSchema = typeof registrationSchema;
export { TimeEnum };