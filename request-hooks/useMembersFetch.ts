import { toast } from 'react-hot-toast';
import useSWR, { SWRConfiguration } from 'swr';

import { useProjectDefaults, useProjectSelector } from '@/hooks';
import { membersFetch } from '@/requests';
import { MemberType } from '@/schemas';

import { FetchMembersKey } from './keys';


type Options = SWRConfiguration<MemberType[], Error>

export function useMembersFetch(options: Options = {}) {
    const { defaultMembers } = useProjectDefaults();
    const projectId = useProjectSelector((project) => project.id);

    return useSWR<MemberType[], Error, FetchMembersKey>(
        ['MEMBERS', { projectId }],

        () => {
            return defaultMembers || membersFetch({ projectId });
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


