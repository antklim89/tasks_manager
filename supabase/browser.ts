import { User, createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import type { Database } from './generated-types';


export const getBrowserClient = () => createClientComponentClient<Database>({});

export async function getBrowserUser(): Promise<User> {
    const supabase = getBrowserClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('You are not authenticated!');

    return session.user;
}
