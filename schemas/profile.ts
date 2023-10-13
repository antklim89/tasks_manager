import { z } from 'zod';


const nameSchema = z.union([
    z.string()
        .min(3)
        .max(200),
    z.string()
        .length(0),
]);

export const profileSchema = z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    description: z.string(),
    email: z.string(),
});

export const profileUpdateSchema = z.object({
    firstName: nameSchema,
    lastName: nameSchema,
    description: z.string().max(5000),
});

export type ProfileUpdateType = z.infer<typeof profileUpdateSchema>
export type ProfileType = z.infer<typeof profileSchema>
