import { z } from 'zod';


export const projectSchema = z.object({
    id: z.number(),
    name: z.string(),
    owner: z.string(),
    project: z.number(),
});

export type ProjectType = z.infer<typeof projectSchema>
