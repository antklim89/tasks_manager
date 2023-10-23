import { taskSchema } from '@/schemas';
import { getSupabaseClient } from '@/supabase/client';


export async function tasksFetch(columnId: number, taskOrder: number[] | null) {
    const supabase = await getSupabaseClient();

    const { error, data } = await supabase
        .from('tasks')
        .select('*')
        .eq('columnId', columnId);

    if (error) throw error;

    if (taskOrder) data.sort((a, b) => taskOrder.indexOf(a.id) - taskOrder.indexOf(b.id));
    return taskSchema.array().parseAsync(data);
}
