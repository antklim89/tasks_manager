import { toast } from 'react-hot-toast';
import useSWR, { SWRConfiguration } from 'swr';

import { ProfileType, profileSchema } from '@/schemas';
import { getBrowserClient, getBrowserUser } from '@/supabase/browser';

import { ProfileKey } from './keys';


type Options = SWRConfiguration<ProfileType, Error>;

export function useProfileFetch(options?: Options) {
    return useSWR<ProfileType, Error, ProfileKey>(
        ['PROFILE'],

        async () => {
            const supabase = getBrowserClient();
            const user = await getBrowserUser();

            const { error, data } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (error) throw error;

            return profileSchema.parseAsync(data);
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
