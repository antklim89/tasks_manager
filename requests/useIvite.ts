import toast from 'react-hot-toast';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { useProject } from '@/hooks';
import { getBrowserClient } from '@/supabase/browser';


const TOAST_ID = 'INVITE';

type Options = SWRMutationConfiguration<void, Error, 'INVITE', { email: string }>;

export function useInvite(options?: Options) {
    const { projectId } = useProject();
    return useSWRMutation<void, Error, 'INVITE', { email: string }>(
        'INVITE',

        async (key, { arg: { email } }) => {
            // TODO: should be sent invitation fo member
            await getBrowserClient().functions.invoke('invite', {
                body: { email, projectId },
            });
        },
        {
            ...options,
            onSuccess(...args) {
                toast.success('The member invited.', { id: TOAST_ID });
                options?.onSuccess?.(...args);
            },
            onError(...args) {
                toast.error('Failed to invite the member. Try again later.', { id: TOAST_ID });
                options?.onError?.(...args);
            },
        },
    );
}
