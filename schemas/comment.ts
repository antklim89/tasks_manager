import { z } from 'zod';


export const commentSchema = z.object({
    id: z.number(),
    createdAt: z.string(),
    projectId: z.number(),
    taskId: z.number(),
    author: z.object({
        id: z.string(),
        firstName: z.string(),
        lastName: z.string(),
    }).nullish(),
    text: z.string(),
});

export const commentUpdateSchema = z.object({
    text: z.string().min(5).max(2000),
});


export type CommentType = z.infer<typeof commentSchema>

export type CommentUpdateType = z.infer<typeof commentUpdateSchema>
