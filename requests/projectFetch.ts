import { projectSchema } from '@/schemas';
import { getSupabaseClient } from '@/supabase/client';


export async function projectFetch({ projectId }: { projectId: number; }) {
    const supabase = await getSupabaseClient();

    const { error, data } = await supabase.from('projects')
        .select('*')
        .eq('id', projectId)
        .single();
    
    if (error) throw error;

    return projectSchema.parseAsync(data);
}
