import { z } from 'zod';


export const projectCreateSchema = z.object({
    name: z.string().min(3).max(40),
});

export type ProjectCreateType = z.infer<typeof projectCreateSchema>
