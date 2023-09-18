import { z } from 'zod';


export const projectSchema = z.object({
    id: z.number(),
    name: z.string(),
    owner: z.string(),
    description: z.string().nullish(),
});

export const projectUpdateSchema = z.object({
    name: z.string()
        .min(3)
        .max(40),
    description: z.string()
        .max(500)
        .nullish(),
});

export type ProjectUpdateType = z.infer<typeof projectUpdateSchema>
export type ProjectType = z.infer<typeof projectSchema>
