import { columnSchema } from '@/schemas';
import { getSupabaseClient } from '@/supabase/client';


export async function columnsFetch(projectId: number) {
    const supabase = await getSupabaseClient();
    const { error, data } = await supabase
        .from('columns')
        .select('*')
        .order('id')
        .eq('projectId', projectId);

    if (error) throw error;
    return columnSchema.array().parseAsync(data);
}
