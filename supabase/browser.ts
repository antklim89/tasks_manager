import { SupabaseClient, User, createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import type { Database } from '@/supabase-types-generated';


export const getBrowserClient = () => createClientComponentClient<Database>({});

export async function getUser(supabase: SupabaseClient) {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('You are not authenticated!');

    return session.user;
}

export async function getBrowserUser(): Promise<User> {
    const supabase = getBrowserClient();
    return getUser(supabase);
}
