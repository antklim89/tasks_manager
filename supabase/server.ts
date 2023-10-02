import { User, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import type { Database } from './generated-types';


export const getServerClient = () => createServerComponentClient<Database>({ cookies });

export async function getServerUser(): Promise<User> {
    const supabase = getServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('You are not authenticated!');

    return user;
}
