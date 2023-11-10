import { useRef } from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';

import { useProjectSelector }from '@/hooks';
import { memberFetch } from '@/requests';
import { MemberType } from '@/schemas';

import { MemberKey } from './keys';


export function useMemberFetch({ defaultValue }: { defaultValue?: MemberType; } = {}) {
    const projectId = useProjectSelector((project) => project.id, false);
    const isFirstFetch = useRef(true);

    return useSWR<MemberType, Error, MemberKey | undefined>(
        projectId ? ['MEMBER', { projectId }] : undefined,
        () => {
            if (isFirstFetch.current && defaultValue) {
                isFirstFetch.current = false;
                return defaultValue;
            }

            return memberFetch({ projectId: projectId || 0 });
        },
        {
            onError(err) {
                toast.error(err.message, { id: 'MEMBER_FETCH' });
            },
        },
    );
}
