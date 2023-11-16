import { projectListSchema } from '@/schemas';
import { getSupabaseClient } from '@/supabase/client';


export async function projectsFetch() {
    const supabase = await getSupabaseClient();
    const { error, data } = await supabase.from('projects').select('id, name');

    if (error) throw error;

    return projectListSchema.parseAsync(data);
}
