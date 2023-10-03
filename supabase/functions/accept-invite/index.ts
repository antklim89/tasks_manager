import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import * as postgres from 'https://deno.land/x/postgres@v0.14.2/mod.ts';
import { z } from 'https://deno.land/x/zod@v3.22.2/mod.ts';
import type { User } from 'https://esm.sh/@supabase/supabase-js@2.36.0';

import { cors } from '../cors.ts';


const databaseUrl = Deno.env.get('SUPABASE_DB_URL');
const pool = new postgres.Pool(databaseUrl, 3, true);

const bodySchema = z.object({
    email: z.string().email(),
    projectId: z.number().positive(),
});

serve(async (req: Request) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
    const connection = await pool.connect();

    const body = await req.json();
    const parseResult = await bodySchema.safeParseAsync(body);
    if (!parseResult.success) return new Response(parseResult.error.message, { headers: cors, status: 400 });
    const { projectId, email } = parseResult.data;

    const { rows: [user] } = await connection.queryObject<User>`SELECT id FROM auth.users au WHERE au.email = ${email}`;

    if (!user) return new Response('User with this email not found', { headers: cors, status: 404 });

    try {
        await connection.queryObject`
            INSERT INTO members (role, "projectId", "userId", email)
            VALUES ('read-only', ${projectId}, ${user.id}, ${email});
        `;
    } catch (error) {
        if (error instanceof postgres.PostgresError && error?.fields?.code === '23505') {
            return new Response('The member with this email is already exists.', { headers: cors, status: 409 });
        }
        return new Response('Unexpected error. Try again later.', { headers: cors, status: 500 });
    }

    return new Response('Ok', { headers: { 'Content-Type': 'application/json', ...cors } });
});
