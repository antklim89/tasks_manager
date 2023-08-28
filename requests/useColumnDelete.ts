import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { ColumnType } from '@/schemas';
import { getBrowserClient, getBrowserUser } from '@/utils';

import { FetchColumnsKey } from './keys';


type Options = SWRMutationConfiguration<void, Error, FetchColumnsKey, void>;

export function useColumnDelete({ columnId, projectId }: { columnId: number, projectId: number }, options?: Options) {
    return useSWRMutation<void, Error, FetchColumnsKey, void>(
        ['COLUMNS', { projectId }],

        async () => {
            const supabase = getBrowserClient();
            const user = await getBrowserUser();

            const { error } = await supabase.from('columns')
                .delete()
                .eq('id', columnId)
                .eq('owner', user.id);

            if (error) throw new Error('Failed to add new column. Try again later.');
        },
        {
            ...options,
            revalidate: false,
            populateCache(result, columns: ColumnType[]) {
                return columns.filter((c) => c.id !== columnId);
            },
        },
    );
}
