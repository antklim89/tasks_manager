import { z } from 'zod';


export const priorities = ['low', 'medium', 'high', 'very high'] as const;

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
    creator: z.string().nullish(),
    color: z.string().nullish(),
    priority: z.enum(priorities).nullish(),
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
    columnId: z.coerce.number()
        .optional(),
    startAt: z.string()
        .transform(v => new Date(v).toISOString())
        .pipe(z.string().datetime())
        .nullish(),
    color: z.string().length(6).nullish(),
    priority: z.enum(priorities).nullish(),
});

export type TaskPriorities = typeof priorities[number]

export type TaskType = z.infer<typeof taskSchema>

export type TaskCreateType = z.infer<typeof taskCreateSchema>
