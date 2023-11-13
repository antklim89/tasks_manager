import { toast } from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { useProjectSelector }from '@/hooks';
import { MemberType, MemberUpdateType } from '@/schemas';
import { getSupabaseClient } from '@/supabase/client';

import { FetchMembersKey, MemberKey } from './keys';


const TOAST_ID = 'MEMBER_UPDATE';

type Options = SWRMutationConfiguration<MemberUpdateType, Error, FetchMembersKey, MemberUpdateType, MemberType[]>;

export function useMemberUpdate({ memberId }: { memberId: number }, options?: Options) {
    const projectId = useProjectSelector((project) => project.id);
    const { mutate } = useSWRConfig();

    return useSWRMutation<MemberUpdateType, Error, FetchMembersKey, MemberUpdateType, MemberType[]>(
        ['MEMBERS', { projectId }],

        async (key, { arg }) => {
            const supabase = await getSupabaseClient();

            const { error } = await supabase.from('members')
                .update(arg)
                .eq('id', memberId);

            if (error) throw new Error('Failed to update a member. Try again later.');

            return arg;
        },
        {
            ...options,
            revalidate: false,
            populateCache(updatedMember, currentMembers = []) {
                mutate<MemberType>(
                    ['MEMBER', { projectId }] satisfies MemberKey,
                    (currentMember) => (currentMember ? ({ ...currentMember, ...updatedMember }) : undefined),
                    { revalidate: false },
                );

                return currentMembers.map((p) => (p.id === memberId ? { ...p, ...updatedMember } : p));
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
