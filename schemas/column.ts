import { z } from 'zod';


export const columnSchema = z.object({
    id: z.number(),
    name: z.string(),
    owner: z.string(),
    project: z.number(),
});

export type ColumnType = z.infer<typeof columnSchema>
