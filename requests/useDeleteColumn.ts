import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';


import { clientComponentClient, getClientComponentUser } from '@/utils';

import { DeleteColumnKey } from './keys';


export function useDeleteColumn({ columnId, projectId }: { columnId: number, projectId: number }) {
    const { mutate } = useSWRConfig();

    return useSWRMutation<void, Error, DeleteColumnKey>(
        ['DELETE_COLUMN'],

        async () => {
            const supabase = clientComponentClient();
            const user = await getClientComponentUser();

            const { error } = await supabase.from('columns')
                .delete()
                .eq('id', columnId)
                .eq('owner', user.id);

            if (error) throw new Error('Failed to add new column. Try again later.');

            mutate(['FETCH_COLUMNS', { projectId }]);
        },
        {
            throwOnError: true,
        },
    );
}
