import { z } from 'zod';


export const taskSchema = z.object({
    id: z.number(),
    createdAt: z.string(),
    title: z.string(),
    description: z.string().optional(),
    completeAt: z.string().nullish(),
    columnId: z.number(),
    owner: z.string(),
});

export const taskCreateSchema = z.object({
    title: z.string()
        .min(3)
        .max(300),
    description: z.string()
        .max(1000)
        .optional(),
    completeAt: z.string()
        // .datetime()
        .transform((v) => (v.length === 0 ? undefined : new Date(v).toISOString()))
        .nullish(),
});

export type TaskType = z.infer<typeof taskSchema>

export type TaskCreateType = z.infer<typeof taskCreateSchema>
