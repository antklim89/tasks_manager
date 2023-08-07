import useSWRMutation from 'swr/mutation';

import { ColumnType } from '@/schemas';
import { clientComponentClient, getClientComponentUser } from '@/utils';

import { FetchColumnsKey } from './keys';


export function useDeleteColumn({ columnId, projectId }: { columnId: number, projectId: number }) {
    return useSWRMutation<void, Error, FetchColumnsKey>(
        ['COLUMNS', { projectId }],

        async () => {
            const supabase = clientComponentClient();
            const user = await getClientComponentUser();

            const { error } = await supabase.from('columns')
                .delete()
                .eq('id', columnId)
                .eq('owner', user.id);

            if (error) throw new Error('Failed to add new column. Try again later.');
        },
        {
            revalidate: false,
            populateCache(result, columns: ColumnType[]) {
                return columns.filter((c) => c.id !== columnId);
            },
            throwOnError: true,
        },
    );
}
