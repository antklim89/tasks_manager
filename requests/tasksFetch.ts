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
    else if (columnId) supabaseQuery.eq('columnId', columnId);
    else throw new Error('"columnId" or "projectId" is required.');

    const { error, data } = await supabaseQuery;
    if (error) throw error;

    return taskSchema.array().parseAsync(data);
}
