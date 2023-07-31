import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import useSWRMutation from 'swr/mutation';

import { Database } from '@/supabase-types-generated';

import { CreateColumnKey } from './keys';


export function useCreateColumn() {
    return useSWRMutation<void, Error, CreateColumnKey, {projectId: number}>(
        ['CREATE_COLUMN'],

        async (key, { arg: { projectId } }) => {
            const supabase = createClientComponentClient<Database>();

            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error('You are not authenticated!');

            const { error } = await supabase.from('columns').insert({ name: 'New Column', owner: session.user.id, project: projectId });

            if (error) throw new Error('Failed to add new column. Try again later.');
        },

        {
            throwOnError: true,
        },
    );
}
