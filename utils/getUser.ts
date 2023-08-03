import { SupabaseClient, User } from '@supabase/supabase-js';

import { clientComponentClient, serverComponentClient } from './supabase';


export async function getClientComponentUser(): Promise<User> {
    const supabase = clientComponentClient();
    return getUser(supabase);
}

export async function getServerComponentUser(): Promise<User> {
    const supabase = serverComponentClient();
    return getUser(supabase);
}


async function getUser(supabase: SupabaseClient) {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('You are not authenticated!');

    return session.user;
}

