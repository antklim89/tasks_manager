
import { memberSchema } from '@/schemas';
import { getSupabaseClient, getSupabaseUser } from '@/supabase/client';


export async function memberFetch({ projectId }: { projectId: number; }) {
    const supabase = await getSupabaseClient();
    const user = await getSupabaseUser();

    const { error, data } = await supabase.from('members')
        .select('*, profile:userId(*)')
        .eq('projectId', projectId)
        .eq('userId', user.id)
        .single();

    if (!data) throw new Error('You are not member of this project');
    if (error) throw new Error('Failed to fetch member. Try again later.');

    return memberSchema.parseAsync(data);
}


