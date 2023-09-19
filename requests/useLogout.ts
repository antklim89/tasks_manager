import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import { getBrowserClient } from '@/supabase/browser';


const TOAST_ID = 'LOGOUT';

export function useLogout() {
    const { refresh } = useRouter();

    return useSWRMutation<void, Error, string, void>(
        'LOGOUT',

        async () => {
            const { error } = await getBrowserClient().auth.signOut();

            if (error) throw error;
            refresh();
        },
        {
            onSuccess() {
                toast.success('Loged out succesfully.', { id: TOAST_ID });
            },
            onError() {
                toast.error('Failed to log out. Try again later.', { id: TOAST_ID });
            },
        },
    );
}
