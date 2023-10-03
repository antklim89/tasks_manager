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
            const { error } = await getBrowserClient().functions.invoke<null>('accept-invite', {
                body: { email, projectId },
            });

            if (error) throw new Error('Failed to invite the member. Try again later.');
        },
        {
            ...options,
            onSuccess(...args) {
                toast.success('The member invited.', { id: TOAST_ID });
                options?.onSuccess?.(...args);
            },
            onError(err, ...args) {
                toast.error(err.message, { id: TOAST_ID });
                options?.onError?.(err, ...args);
            },
        },
    );
}
