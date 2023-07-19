import { z } from 'zod';


export const newProjectSchema = z.object({
    name: z.string().min(3).max(40),
});
