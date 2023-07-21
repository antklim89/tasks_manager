import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/constants';


export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: true } });
export const serverSupabase = createServerActionClient({ cookies });
