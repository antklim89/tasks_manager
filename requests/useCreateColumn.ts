import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';


import { clientComponentClient } from '@/utils';

import { CreateColumnKey } from './keys';


export function useCreateColumn() {
    const { mutate } = useSWRConfig();

    return useSWRMutation<void, Error, CreateColumnKey, {projectId: number}>(
        ['CREATE_COLUMN'],

        async (key, { arg: { projectId } }) => {
            const supabase = clientComponentClient();

            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error('You are not authenticated!');

            const { error } = await supabase.from('columns').insert({ name: 'New Column', owner: session.user.id, project: projectId });

            if (error) throw new Error('Failed to add new column. Try again later.');

            mutate(['FETCH_COLUMNS', { projectId }]);
        },
        {
            throwOnError: true,
        },
    );
}
