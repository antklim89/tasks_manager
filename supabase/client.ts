import type { User } from '@supabase/supabase-js';

import type { Database } from './generated-types';


export const getSupabaseClient = async () => {
    if (typeof window === 'undefined') {
        const { createServerComponentClient } = await import('@supabase/auth-helpers-nextjs');
        const { cookies } = await import('next/headers');

        return createServerComponentClient<Database>({ cookies });
    }

    const { createClientComponentClient } = await import('@supabase/auth-helpers-nextjs');

    return createClientComponentClient<Database>({});
};

export async function getSupabaseUser(): Promise<User> {
    const supabase = await getSupabaseClient();
    if (typeof window === 'undefined') {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('You are not authenticated!');

        return user;
    }

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('You are not authenticated!');

    return session.user;
}
