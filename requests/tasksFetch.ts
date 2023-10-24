import { taskSchema } from '@/schemas';
import { getSupabaseClient } from '@/supabase/client';


export async function tasksFetch({
    columnId,
    taskOrder,
    projectId,
}:{
    columnId?: number;
    projectId?:number;
    taskOrder?: number[] | null;
}) {
    const supabase = await getSupabaseClient();

    const supabaseQuery = supabase
        .from('tasks')
        .select('*');

    if (projectId) supabaseQuery.eq('projectId', projectId);
    else supabaseQuery.eq('columnId', columnId);

    const { error, data } = await supabaseQuery;
    if (error) throw error;

    if (taskOrder) data.sort((a, b) => taskOrder.indexOf(a.id) - taskOrder.indexOf(b.id));
    return taskSchema.array().parseAsync(data);
}
