import { projectSchema } from '@/schemas';
import { getSupabaseClient } from '@/supabase/client';


export async function projectsFetch(id?: number) {
    const supabase = await getSupabaseClient();
    const supabaseQuery = supabase.from('projects').select('*');

    if (id) supabaseQuery.eq('id', id);

    const { error, data } = await supabaseQuery;
    if (error) throw error;

    return projectSchema.array().parseAsync(data);
}
