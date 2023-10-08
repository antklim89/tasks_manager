import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { z } from 'https://deno.land/x/zod@v3.22.2/mod.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.36.0';

import type { Database } from '../../generated-types.ts';
import { cors } from '../cors.ts';


const {
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
} = z.object({
    SUPABASE_URL: z.string(),
    SUPABASE_ANON_KEY: z.string(),
}).parse(Deno.env.toObject());

serve(async (req: Request) => {
    if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
    const token = new URL(req.url).searchParams.get('token');
    if (!token) return new Response('No invite token.', { headers: cors, status: 404 });

    const supabaseClient = getSupabaseClient();

    const { error } = await supabaseClient
        .from('members')
        .update({ role: 'read-only', inviteToken: null })
        .eq('inviteToken', token);
    if (error) {
        return new Response('Unexpected error. Try again later.', { headers: cors, status: 500 });
    }

    return new Response('Ok', { headers: { ...cors } });
});

function getSupabaseClient() {
    return createClient<Database>(
        SUPABASE_URL,
        SUPABASE_ANON_KEY,
        { global: { headers: { Authorization: SUPABASE_ANON_KEY } } },
    );
}
