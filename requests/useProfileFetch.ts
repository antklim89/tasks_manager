import { toast } from 'react-hot-toast';
import useSWR, { SWRConfiguration } from 'swr';

import { ProfileType, profileSchema } from '@/schemas';
import { getSupabaseClient, getSupabaseUser } from '@/supabase/client';

import { ProfileKey } from './keys';


type Options = SWRConfiguration<ProfileType, Error>;

export function useProfileFetch(options?: Options) {
    return useSWR<ProfileType, Error, ProfileKey>(
        ['PROFILE'],

        async () => {
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
        },
        {
            ...options,
            onError(...args) {
                toast.error('Failed to fetch profile. Try again later.', { id: 'PROFILE_FETCH' });
                options?.onError?.(...args);
            },
        },
    );
}
