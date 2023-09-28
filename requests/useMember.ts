import { toast } from 'react-hot-toast';
import useSWR, { SWRConfiguration } from 'swr';

import { MemberType, memberSchema } from '@/schemas';
import { getBrowserClient, getBrowserUser } from '@/supabase/browser';

import { MemberKey } from './keys';


type Options = SWRConfiguration<MemberType, Error>;

export async function getMember(projectId: number) {
    const supabase = getBrowserClient();
    const user = await getBrowserUser();

    const { error, data } = await supabase.from('members')
        .select('*')
        .eq('projectId', projectId)
        .eq('userId', user.id)
        .single();

    if (!data) throw new Error('You are not member of this project');
    if (error) throw error;

    return memberSchema.parseAsync(data);
}

export function useMember({ projectId }: { projectId: number }, options: Options = {}) {
    return useSWR<MemberType, Error, MemberKey>(
        ['MEMBER'],

        () => getMember(projectId),
        {
            ...options,
            onError(...args) {
                toast.error('You are not member of this project', { id: 'MEMBER_FETCH' });
                options?.onError?.(...args);
            },
        },
    );
}

