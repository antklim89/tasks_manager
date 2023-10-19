import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import useSWRMutation from 'swr/mutation';

import { getSupabaseClient } from '@/supabase/client';


const TOAST_ID = 'LOGOUT';

export function useLogout() {
    const { refresh } = useRouter();

    return useSWRMutation<void, Error, string, void>(
        'LOGOUT',

        async () => {
            const supabase = await getSupabaseClient();
            const { error } = await supabase.auth.signOut();

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
