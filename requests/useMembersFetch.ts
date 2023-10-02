import { toast } from 'react-hot-toast';
import useSWR, { SWRConfiguration } from 'swr';

import { useProject } from '@/hooks';
import { MemberType, memberSchema } from '@/schemas';
import { getBrowserClient } from '@/supabase/browser';

import { FetchMembersKey } from './keys';


type Options = SWRConfiguration<MemberType[], Error>;

export function useMembersFetch(options: Options = {}) {
    const { projectId } = useProject();
    return useSWR<MemberType[], Error, FetchMembersKey>(
        ['MEMBERS', { projectId }],

        async () => {
            const supabase = getBrowserClient();

            const supabaseQuery = supabase.from('members')
                .select('*')
                .eq('projectId', projectId);

            const { error, data } = await supabaseQuery;
            if (error) throw error;

            return memberSchema.array().parseAsync(data);
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
