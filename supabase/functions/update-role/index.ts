import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { SMTPClient, type ClientOptions } from 'https://deno.land/x/denomailer@1.6.0/mod.ts';
import { nanoid } from 'https://deno.land/x/nanoid@v3.0.0/mod.ts';
import * as postgres from 'https://deno.land/x/postgres@v0.14.2/mod.ts';
import { z } from 'https://deno.land/x/zod@v3.22.2/mod.ts';
import { type User, createClient } from 'https://esm.sh/@supabase/supabase-js@2.36.0';

import type { Database } from '../../generated-types.ts';
import { cors } from '../cors.ts';


const {
    SUPABASE_DB_URL,
    SEND_EMAIL,
    EMAIL_PASSWORD,
    RECV_EMAIL,
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
} = Deno.env.toObject();


const bodySchema = z.object({
    role: z.enum(['admin', 'user', 'guest']),
});

serve(async (req: Request) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });

    try {
        const { role } = await getBody(req);

    } catch (error) {
        if (error instanceof Response) return error;
        console.error(error);
        return new Response('Unexpected error. Try again later.', { headers: cors, status: 500 });
    }
});


function getSupabaseClient(req: Request) {
    const authToken = req.headers.get('Authorization');
    if (!authToken) throw new Response('You are not authenticated.', { headers: cors, status: 401 });
    return createClient<Database>(
        SUPABASE_URL,
        SUPABASE_ANON_KEY,
        { global: { headers: { Authorization: authToken } } },
    );
}

async function getBody(req: Request) {
    const body = await req.json();
    const parseResult = await bodySchema.safeParseAsync(body);
    if (!parseResult.success) throw new Response(parseResult.error.message, { headers: cors, status: 400 });
    return parseResult.data;
}
