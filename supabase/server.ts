import { User, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import type { Database } from '@/supabase-types-generated';

import { getUser } from './browser';


export const getServerClient = () => createServerComponentClient<Database>({ cookies });

export async function getServerUser(): Promise<User> {
    const supabase = getServerClient();
    return getUser(supabase);
}
