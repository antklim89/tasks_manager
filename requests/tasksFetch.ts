import { taskSchema } from '@/schemas';
import { getSupabaseClient } from '@/supabase/client';


export async function tasksFetch({
    columnId,
    projectId,
}:{
    columnId?: number;
    projectId?:number;
}) {
    const supabase = await getSupabaseClient();

    const supabaseQuery = supabase
        .from('tasks')
        .select('*');

    if (projectId) supabaseQuery.eq('projectId', projectId);
    else supabaseQuery.eq('columnId', columnId);

    const { error, data } = await supabaseQuery;
    if (error) throw error;

    return taskSchema.array().parseAsync(data);
}
