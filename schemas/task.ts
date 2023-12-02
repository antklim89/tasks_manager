import { z } from 'zod';


export const taskSchema = z.object({
    id: z.number(),
    createdAt: z.string(),
    title: z.string(),
    description: z.string().optional(),
    completeAt: z.string()
        .transform(v => new Date(v).toISOString())
        .pipe(z.string().datetime())
        .nullish(),
    startAt: z.string()
        .transform(v => new Date(v).toISOString())
        .pipe(z.string().datetime())
        .nullish(),
    columnId: z.number(),
    projectId: z.number(),
});

export const taskCreateSchema = z.object({
    title: z.string()
        .min(3)
        .max(300),
    description: z.string()
        .max(1000)
        .optional(),
    completeAt: z.string()
        .transform(v => new Date(v).toISOString())
        .pipe(z.string().datetime())
        .nullish(),
    columnId: z.coerce.number().optional(),
    startAt: z.string()
        .transform(v => new Date(v).toISOString())
        .pipe(z.string().datetime())
        .nullish(),
});

export type TaskType = z.infer<typeof taskSchema>

export type TaskCreateType = z.infer<typeof taskCreateSchema>
