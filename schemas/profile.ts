import { z } from 'zod';


export const profileSchema = z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
});

export const profileUpdateSchema = z.object({
    firstName: z.string()
        .min(3)
        .max(200)
        .optional(),
    lastName: z.string()
        .min(3)
        .max(200)
        .optional(),
});

export type ProfileUpdateType = z.infer<typeof profileUpdateSchema>
export type ProfileType = z.infer<typeof profileSchema>
