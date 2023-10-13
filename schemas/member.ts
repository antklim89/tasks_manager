import { z } from 'zod';

import { profileSchema } from './profile';


export const updateRoles = ['guest', 'user', 'admin'] as const;
export const roles = ['invited', ...updateRoles] as const;


export const memberSchema = z.object({
    id: z.number(),
    createdAt: z.string(),
    userId: z.string(),
    role: z.enum(roles),
    projectId: z.number(),
    profile: profileSchema,
});

export const memberUpdateSchema = z.object({
    role: z.enum(updateRoles),
});

export type MemberType = z.infer<typeof memberSchema>
export type MemberUpdateType = z.infer<typeof memberUpdateSchema>
