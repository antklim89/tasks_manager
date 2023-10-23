import { useRef } from 'react';
import { toast } from 'react-hot-toast';
import useSWR, { SWRConfiguration } from 'swr';

import { fetchProfile } from '@/requests';
import { ProfileType } from '@/schemas';

import { ProfileKey } from './keys';


type Options = SWRConfiguration<ProfileType, Error> & { defaultValue?: ProfileType };

export function useProfileFetch({ defaultValue, ...options }: Options = {}) {
    const isFirstFetch = useRef(true);

    return useSWR<ProfileType, Error, ProfileKey>(
        ['PROFILE'],

        async () => {
            if (isFirstFetch.current && defaultValue) {
                isFirstFetch.current = false;
                return defaultValue;
            }

            return fetchProfile();
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


