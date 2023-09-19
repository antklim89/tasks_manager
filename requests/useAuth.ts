import { useRouter } from 'next/navigation';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { AuthFotmInput } from '@/schemas';
import { getBrowserClient } from '@/supabase/browser';

import { AuthKey } from './keys';


type Options = SWRMutationConfiguration<void, Error, AuthKey, AuthFotmInput & {type: 'login' | 'register'}>;

export function useAuth(options?: Options) {
    const { refresh } = useRouter();
    return useSWRMutation<void, Error, AuthKey, AuthFotmInput & {type: 'login' | 'register'}>(
        ['AUTH'],

        async (key, { arg: { type, email, password } }) => {
            const supabase = getBrowserClient();
            const { error } = type === 'register'
                ? await supabase.auth.signUp({ email, password })
                : await supabase.auth.signInWithPassword({ email, password });

            if (error) throw error;
            refresh();
        },
        options,
    );
}
