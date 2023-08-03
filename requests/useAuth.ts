import { useRouter } from 'next/navigation';
import useSWRMutation from 'swr/mutation';

import { AuthFotmInput } from '@/features/Auth/Auth.types';
import { clientComponentClient } from '@/utils';

import { AuthKey } from './keys';


export function useAuth() {
    const { refresh } = useRouter();
    return useSWRMutation<void, Error, AuthKey, AuthFotmInput & {type: 'login' | 'register'}>(
        ['AUTH'],

        async (key, { arg: { type, email, password } }) => {
            const supabase = clientComponentClient();
            const { error } = type === 'register'
                ? await supabase.auth.signUp({ email, password })
                : await supabase.auth.signInWithPassword({ email, password });

            if (error) throw error;
            refresh();
        },

        {
            throwOnError: false,
        },
    );
}
