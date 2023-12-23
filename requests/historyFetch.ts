import { historySchema } from '@/schemas';
import { getSupabaseClient } from '@/supabase/client';


export const HISTORY_LIMIT = 50;

export async function historyFetch({ 
    projectId, 
    lastId, 
    startDate,
    search,
}: { 
    projectId: number; 
    lastId?: number; 
    startDate?: string;
    search?: string;
 }) {
    const supabase = await getSupabaseClient();

    const supabaseQuery = supabase
        .from('history')
        .select('*, user:userId(email)')
        .order('id', { ascending: false })
        .limit(HISTORY_LIMIT)
        .eq('projectId', projectId);

    if (lastId) supabaseQuery.lt('id', lastId);
    if (startDate) supabaseQuery.lte('createdAt', startDate);
    if (search) supabaseQuery.textSearch('body', `'${search}'`);

    const { error, data } = await supabaseQuery;


    if (error) throw new Error('Failed to fetch history. Try again later.');

    return historySchema.array().parseAsync(data);
}
