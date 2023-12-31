import { z } from 'zod';


export const historySchema = z.object({
    id: z.number(),
    createdAt: z.string(),
    projectId: z.number(),
    userId: z.string().nullable(),
    user: z.object({
        email: z.string(),
    }),
    body: z.string(),
});


export const historyUpdateSchema = z.object({
    body: z.string(),
});

export type HistoryType = z.infer<typeof historySchema>
export type HistoryUpdateType = z.infer<typeof historyUpdateSchema>
