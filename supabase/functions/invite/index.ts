import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import * as postgres from 'https://deno.land/x/postgres@v0.14.2/mod.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.36.0';

import type { Database } from '../../../supabase-types-generated.ts';
import { cors } from '../cors.ts';


const databaseUrl = Deno.env.get('SUPABASE_DB_URL');
const pool = new postgres.Pool(databaseUrl, 3, true);


serve(async (req: Request) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
    const connection = await pool.connect();
    const { projectId, email } = await req.json();

    const supabaseClient = createClient<Database>(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
        { global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } } },
    );

    const { rows: [user] } = await connection.queryObject(`SELECT id FROM auth.users au WHERE au.email = '${email}'`);

    if (!user) return new Response('User with this email not found', { headers: cors, status: 404 });

    await supabaseClient.from('members')
        .insert({
            role: 'member',
            projectId,
            userId: user.id,
            email,
        });

    return new Response(
        'ok',
        { headers: { 'Content-Type': 'application/json', ...cors } },
    );
});
