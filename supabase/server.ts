import { User, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { getUser } from './browser';
import type { Database } from './generated-types';


export const getServerClient = () => createServerComponentClient<Database>({ cookies });

export async function getServerUser(): Promise<User> {
    const supabase = getServerClient();
    return getUser(supabase);
}
