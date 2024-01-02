import { commentSchema } from '@/schemas/comment';
import { getSupabaseClient } from '@/supabase/client';


export async function commentsFetch({ projectId, taskId }: { projectId: number, taskId: number }) {
    const supabase = await getSupabaseClient();

    const { error, data } = await supabase.from('comments')
        .select('*, author:authorId(firstName, lastName)')
        .eq('projectId', projectId)
        .eq('taskId', taskId);
    
    if (error) throw error;

    return commentSchema.array().parseAsync(data);
}
