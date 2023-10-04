import { z } from 'zod';


export const roles = ['read-only', 'member', 'admin'] as const;

export const memberSchema = z.object({
    id: z.number(),
    createdAt: z.string(),
    userId: z.string(),
    email: z.string(),
    name: z.string(),
    role: z.enum(roles),
    projectId: z.number(),
});

export const memberUpdateSchema = z.object({
    name: z.string().max(200).optional(),
});

export type MemberType = z.infer<typeof memberSchema>
export type MemberUpdateType = z.infer<typeof memberUpdateSchema>
