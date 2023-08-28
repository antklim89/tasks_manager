import { SupabaseClient, User } from '@supabase/supabase-js';

import { getBrowserClient, getServerClient } from './supabase';


export async function getBrowserUser(): Promise<User> {
    const supabase = getBrowserClient();
    return getUser(supabase);
}

export async function getServerUser(): Promise<User> {
    const supabase = getServerClient();
    return getUser(supabase);
}


async function getUser(supabase: SupabaseClient) {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('You are not authenticated!');

    return session.user;
}

