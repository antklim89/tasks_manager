import { z } from 'zod';


export const projectSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().optional(),
});

export const projectListSchema = projectSchema.pick({ id: true, name: true }).array();

export const projectUpdateSchema = z.object({
    name: z.string()
        .min(3)
        .max(40),
    description: z.string()
        .max(500)
        .optional(),
});

export type ProjectUpdateType = z.infer<typeof projectUpdateSchema>
export type ProjectType = z.infer<typeof projectSchema>
export type ProjectListType = z.infer<typeof projectListSchema>
