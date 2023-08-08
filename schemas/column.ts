import { z } from 'zod';


export const columnSchema = z.object({
    id: z.number(),
    name: z.string(),
    owner: z.string(),
    project: z.number(),
});

export const columnUpdateSchema = z.object({
    name: z.string()
        .min(3)
        .max(40),
});

export type ColumnType = z.infer<typeof columnSchema>
export type ColumnUpdateType = z.infer<typeof columnUpdateSchema>