import { projectSchema } from '@/schemas';
import { getSupabaseClient } from '@/supabase/client';


export async function projectsFetch() {
    const supabase = await getSupabaseClient();
    const { error, data } = await supabase.from('projects').select();

    if (error) throw error;

    return projectSchema.array().parseAsync(data);
}
