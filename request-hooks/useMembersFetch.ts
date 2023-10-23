import { useRef } from 'react';
import { toast } from 'react-hot-toast';
import useSWR, { SWRConfiguration } from 'swr';

import { useProject } from '@/hooks';
import { fetchMembers } from '@/requests';
import { MemberType } from '@/schemas';

import { FetchMembersKey } from './keys';


type Options = SWRConfiguration<MemberType[], Error> & { defaultValue?: MemberType[] };

export function useMembersFetch({ defaultValue, ...options }: Options = {}) {
    const { projectId } = useProject();
    const isFirstFetch = useRef(true);

    return useSWR<MemberType[], Error, FetchMembersKey>(
        ['MEMBERS', { projectId }],

        () => {
            if (isFirstFetch.current && defaultValue) {
                isFirstFetch.current = false;
                return defaultValue;
            }

            return fetchMembers(projectId);
        },
        {
            ...options,
            onError(...args) {
                toast.error('Failed to fetch members. Try again later.', { id: 'MEMBERS_FETCH' });
                options?.onError?.(...args);
            },
        },
    );
}


