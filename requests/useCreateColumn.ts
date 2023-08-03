import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';


import { clientComponentClient, getServerComponentUser } from '@/utils';

import { CreateColumnKey } from './keys';


export function useCreateColumn() {
    const { mutate } = useSWRConfig();

    return useSWRMutation<void, Error, CreateColumnKey, {projectId: number}>(
        ['CREATE_COLUMN'],

        async (key, { arg: { projectId } }) => {
            const supabase = clientComponentClient();

            const user = await getServerComponentUser();

            const { error } = await supabase.from('columns').insert({ name: 'New Column', owner: user.id, project: projectId });

            if (error) throw new Error('Failed to add new column. Try again later.');

            mutate(['FETCH_COLUMNS', { projectId }]);
        },
        {
            throwOnError: true,
        },
    );
}
