import { z } from 'zod';


export const authSchema = z.object({
    email: z.string().min(3),
    password: z.string().min(3),
    confirm: z.string().optional(),
});

export type AuthFotmInput = z.infer<typeof authSchema>
