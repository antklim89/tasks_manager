import { z } from 'zod';


export const taskSchema = z.object({
    id: z.number(),
    createdAt: z.string(),
    title: z.string(),
    description: z.string().optional(),
    completeAt: z.string()/* .datetime()*/.nullish(),
    startAt: z.string()/* .datetime()*/.nullish(),
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
        // TODO: add datetime validation
        // .datetime()
        .nullish(),
    startAt: z.string()
        // TODO: add datetime validation
        // .datetime()
        .nullish(),
});

export type TaskType = z.infer<typeof taskSchema>

export type TaskCreateType = z.infer<typeof taskCreateSchema>
