import { z } from 'zod';


export const tables = ['columns', 'projects', 'tasks', 'members'] as const;
export const operations = ['INSERT', 'UPDATE', 'DELETE'] as const;

export const historySchema = z.object({
    id: z.number(),
    createdAt: z.string(),
    projectId: z.number(),
    userId: z.string().nullable(),
    table: z.enum(tables),
    operation: z.enum(operations),
    newData: z.record(z.unknown()).nullable(),
    oldData: z.record(z.unknown()).nullable(),
});

export type HistoryTables = typeof tables[number]
export type HistoryOperations = typeof operations[number]
export type HistoryType = z.infer<typeof historySchema>
