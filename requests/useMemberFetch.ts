import toast from 'react-hot-toast';
import useSWR from 'swr';

import { useProjectId } from '@/hooks';
import { MemberType, memberSchema } from '@/schemas';
import { getBrowserClient, getBrowserUser } from '@/supabase/browser';

import { MemberKey } from './keys';


export async function getMember(projectId: number) {
    const supabase = getBrowserClient();
    const user = await getBrowserUser();

    const { error, data } = await supabase.from('members')
        .select('*')
        .eq('projectId', projectId)
        .eq('userId', user.id)
        .single();

    if (!data) throw new Error('You are not member of this project');
    if (error) throw new Error('Failed to fetch member. Try again later.');

    return memberSchema.parseAsync(data);
}

export function useFetchMember() {
    const projectId = useProjectId();
    return useSWR<MemberType, Error, MemberKey>(
        ['MEMBER', { projectId }],
        () => getMember(projectId),
        {
            onError(err) {
                toast.error(err.message, { id: 'MEMBER_FETCH' });
            },
        },
    );
}

