import { toast } from 'react-hot-toast';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { ProfileType, ProfileUpdateType } from '@/schemas';
import { getSupabaseClient } from '@/supabase/client';

import { ProfileKey } from './keys';


const TOAST_ID = 'PROFILE_UPDATE';

type Options = SWRMutationConfiguration<ProfileUpdateType, Error, ProfileKey, ProfileUpdateType>;

export function useProfileUpdate({ userId }: { userId: string }, options?: Options) {
    return useSWRMutation<ProfileUpdateType, Error, ProfileKey, ProfileUpdateType>(
        ['PROFILE'],

        async (key, { arg }) => {
            const supabase = await getSupabaseClient();

            const { error } = await supabase.from('profiles')
                .update(arg)
                .eq('id', userId);

            if (error) throw error;
            return arg;
        },
        {
            ...options,
            revalidate: false,
            populateCache(updatedProfile, currentProfile: ProfileType) {
                return { ...currentProfile, ...updatedProfile };
            },
            onSuccess(...args) {
                toast.success('Profile updated succesfully.', { id: TOAST_ID });
                options?.onSuccess?.(...args);
            },
            onError(...args) {
                toast.error('Failed to update a profile. Try again later.', { id: TOAST_ID });
                options?.onError?.(...args);
            },
        },
    );
}
