import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { Database } from '@/supabase-types-generated';


export const serverComponentClient = () => createServerComponentClient<Database>({ cookies });
export const clientComponentClient = () => createClientComponentClient<Database>({});
