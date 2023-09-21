import { SupabaseClient, User, createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import type { Database } from '@/supabase-types-generated';

// @ts-expect-error test
export const getBrowserClient = () => console.log(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
 || createClientComponentClient<Database>({});

export async function getUser(supabase: SupabaseClient) {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('You are not authenticated!');

    return session.user;
}

export async function getBrowserUser(): Promise<User> {
    const supabase = getBrowserClient();
    return getUser(supabase);
}
