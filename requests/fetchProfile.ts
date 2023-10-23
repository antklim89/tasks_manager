import { profileSchema } from '@/schemas';
import { getSupabaseClient, getSupabaseUser } from '@/supabase/client';


export async function fetchProfile() {
    const supabase = await getSupabaseClient();
    const user = await getSupabaseUser();

    const { error, data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id);

    if (!data || !data[0]) {
        const newProfile = await supabase
            .from('profiles')
            .insert({ id: user.id, email: user.email || '' })
            .eq('id', user.id)
            .select('*')
            .single();

        if (newProfile.error) throw newProfile.error;
        return profileSchema.parseAsync(newProfile.data);
    }
    if (error) throw error;

    return profileSchema.parseAsync(data[0]);
}
