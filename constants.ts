import { z } from 'zod';


export const DEFAULT_TITLE = process.env.DEFAULT_TITLE || 'Tasks manager';


export const SUPABASE_ANON_KEY = z.string().parse(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
export const SUPABASE_URL = z.string().parse(process.env.NEXT_PUBLIC_SUPABASE_URL);


export const priorities = ['low', 'medium', 'high', 'very high'] as const;
export const colors = ['FF8811', '24251E', '0A2472', '392F5A', '3C1518'] as const;
