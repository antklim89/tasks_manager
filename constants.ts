import { z } from 'zod';


export const DEFAULT_TITLE = process.env.DEFAULT_TITLE || 'Tasks manager';


export const SUPABASE_ANON_KEY = z.string().parse(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
export const SUPABASE_URL = z.string().parse(process.env.NEXT_PUBLIC_SUPABASE_URL);
