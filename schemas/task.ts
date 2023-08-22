import { z } from 'zod';


export const taskSchema = z.object({
    id: z.number(),
    createdAt: z.string(),
    title: z.string(),
    description: z.string(),
    completeAt: z.string(),
    columnId: z.number(),
    owner: z.number(),
});

export type TaskType = z.infer<typeof taskSchema>
