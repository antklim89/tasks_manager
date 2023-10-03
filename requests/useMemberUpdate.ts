import { toast } from 'react-hot-toast';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { useProject } from '@/hooks';
import { MemberType, MemberUpdateType } from '@/schemas';
import { getBrowserClient } from '@/supabase/browser';

import { FetchMembersKey } from './keys';


const TOAST_ID = 'MEMBER_UPDATE';

type Options = SWRMutationConfiguration<MemberUpdateType, Error, FetchMembersKey, MemberUpdateType>;

export function useMemberUpdate({ memberId }: { memberId: number }, options?: Options) {
    const { projectId } = useProject();
    return useSWRMutation<MemberUpdateType, Error, FetchMembersKey, MemberUpdateType>(
        ['MEMBERS', { projectId }],

        async (key, { arg }) => {
            const supabase = getBrowserClient();

            const { error } = await supabase.from('members')
                .update(arg)
                .eq('id', memberId);

            if (error) throw new Error('Failed to update a member. Try again later.');

            return arg;
        },
        {
            ...options,
            revalidate: false,
            populateCache(updatedMember, currentData: MemberType[]) {
                return currentData.map((p) => (p.id === memberId ? { ...p, ...updatedMember } : p));
            },
            onSuccess(...args) {
                toast.success('Member updated succesfully.', { id: TOAST_ID });
                options?.onSuccess?.(...args);
            },
            onError(err, ...args) {
                toast.error(err.message, { id: TOAST_ID });
                options?.onError?.(err, ...args);
            },
        },
    );
}
