import { toast } from 'react-hot-toast';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { MemberType, memberSchema } from '@/schemas';
import { getBrowserClient, getBrowserUser } from '@/supabase/browser';

import { FetchMembersKey } from './keys';


const TOAST_ID = 'MEMBER_CREATE';

type Options = SWRMutationConfiguration<MemberType, Error, FetchMembersKey, void>;

export function useMemberCreate({ projectId }: { projectId: number }, options?: Options) {
    return useSWRMutation<MemberType, Error, FetchMembersKey, void>(
        ['MEMBERS', { projectId }],

        async () => {
            toast.loading('Member is adding...', { id: TOAST_ID });
            const supabase = getBrowserClient();
            const user = await getBrowserUser();

            const { error, data } = await supabase.from('members')
                .insert({ role: 'read-only', userId: user.id, projectId })
                .select('*')
                .single();

            if (error) throw error;
            return memberSchema.parse(data);
        },
        {
            ...options,
            revalidate: false,
            populateCache(newMember, currentData: MemberType[]) {
                return [...currentData, newMember];
            },
            onSuccess(...args) {
                toast.success('Member added succesfully.', { id: TOAST_ID });
                options?.onSuccess?.(...args);
            },
            onError(...args) {
                toast.error('Failed to add a new member. Try again later.', { id: TOAST_ID });
                options?.onError?.(...args);
            },
        },
    );
}
