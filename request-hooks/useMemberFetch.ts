import toast from 'react-hot-toast';
import useSWR from 'swr';

import { useProjectSelector } from '@/hooks';
import { MemberType } from '@/schemas';

import { MemberKey } from './keys';


export function useMemberFetch({ member }: { member: MemberType; }) {
    const projectId = useProjectSelector((project) => project.id, false);

    return useSWR<MemberType, Error, MemberKey | undefined>(
        projectId ? ['MEMBER', { projectId }] : undefined,
        () => member,
        {
            onError(err) {
                toast.error(err.message, { id: 'MEMBER_FETCH' });
            },
        },
    );
}
