import { memberSchema } from '@/schemas';
import { getSupabaseClient } from '@/supabase/client';


export async function membersFetch(projectId: number) {
    const supabase = await getSupabaseClient();

    const supabaseQuery = supabase.from('members')
        .select('*, profile:userId(*)')
        .eq('projectId', projectId);

    const { error, data } = await supabaseQuery;
    if (error) throw error;

    return memberSchema.array().parseAsync(data);
}
