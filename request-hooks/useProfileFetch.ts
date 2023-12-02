import { toast } from 'react-hot-toast';
import useSWR, { SWRConfiguration } from 'swr';

import { profileFetch } from '@/requests';
import { ProfileType } from '@/schemas';

import { ProfileKey } from './keys';


type Options = SWRConfiguration<ProfileType, Error> & { defaultValue?: ProfileType };

export function useProfileFetch({ defaultValue, ...options }: Options = {}) {
    return useSWR<ProfileType, Error, ProfileKey>(
        ['PROFILE'],

        async () => {
            return defaultValue || profileFetch();
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


