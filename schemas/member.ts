import { z } from 'zod';


export const roles = ['invited', 'read-only', 'member', 'admin'] as const;

export const memberSchema = z.object({
    id: z.number(),
    createdAt: z.string(),
    user: z.string(),
    role: z.enum(roles),
    projectId: z.number(),
});

export const memberUpdateSchema = z.object({
    role: z.enum(roles),
});

export type MemberType = z.infer<typeof memberSchema>
export type MemberUpdateType = z.infer<typeof memberUpdateSchema>
