import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.36.0';

import { Database } from '../../../supabase-types-generated.ts';


serve(async (req: Request) => {
    // const { projectId, email } = await req.json();
    const supabaseClient = createClient<Database>(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        { global: { headers: { Authorization: req.headers.get('Authorization') ?? '' } } },
    );

    const { data: { user } } = await supabaseClient.auth.getUser();

    // await supabaseClient.from('member')
    //     .insert({
    //         role: 'member',
    //         projectId,
    //         userId: user.id,
    //         email,
    //     });

    return new Response(
        '{}',
        { headers: { 'Content-Type': 'application/json' } },
    );
});
