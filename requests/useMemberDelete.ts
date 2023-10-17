import { toast } from 'react-hot-toast';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { useProject } from '@/hooks';
import { MemberType } from '@/schemas';
import { getBrowserClient } from '@/supabase/browser';

import { FetchMembersKey } from './keys';


const TOAST_ID = 'MEMBER_DELETE';

type Options = SWRMutationConfiguration<void, Error, FetchMembersKey, void>;

export function useMemberDelete({ memberId }: { memberId: number }, options?: Options) {
    const { projectId } = useProject();
    return useSWRMutation<void, Error, FetchMembersKey, void>(
        ['MEMBERS', { projectId }],

        async () => {
            const supabase = getBrowserClient();

            const { error } = await supabase.from('members')
                .delete()
                .eq('id', memberId);

            if (error) throw error;
        },
        {
            ...options,
            revalidate: false,
            populateCache(_, currentData: MemberType[]) {
                return currentData.filter((member) => member.id !== memberId);
            },
            onSuccess(...args) {
                toast.success('Member deleted succesfully.', { id: TOAST_ID });
                options?.onSuccess?.(...args);
            },
            onError(...args) {
                toast.error('Failed to delete a member. Try again later.', { id: TOAST_ID });
                options?.onError?.(...args);
            },
        },
    );
}
