import { historySchema } from '@/schemas';
import { getSupabaseClient, getSupabaseUser } from '@/supabase/client';


export async function historyCreate({ body, projectId }: { body: string, projectId: number }) {
    console.log('==  body\n', body);
    const supabase = await getSupabaseClient();
    const user = await getSupabaseUser();

    const { error, data } = await supabase.from('history')
        .insert({ body, projectId, userId: user.id })
        .select('*')
        .single();

    if (error) throw error;
    return historySchema.parse(data);
}
