import { toast } from 'react-hot-toast';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { ColumnType } from '@/schemas';
import { getBrowserClient, getBrowserUser } from '@/utils';

import { FetchColumnsKey } from './keys';


type Options = SWRMutationConfiguration<{name: string}, Error, FetchColumnsKey, {name: string}>;

export function useColumnUpdate({ columnId, projectId }: { columnId: number, projectId: number }, options?: Options) {
    return useSWRMutation<{name: string}, Error, FetchColumnsKey, {name: string}>(
        ['COLUMNS', { projectId }],

        async (key, { arg }) => {
            const supabase = getBrowserClient();
            const user = await getBrowserUser();

            const { error } = await supabase.from('columns')
                .update(arg)
                .eq('id', columnId)
                .eq('owner', user.id);

            if (error) throw error;

            return arg;
        },
        {
            ...options,
            revalidate: false,
            populateCache(result, columns: ColumnType[]) {
                return columns.map(((column) => (column.id === columnId ? { ...column, ...result } : column)));
            },
            onError(...args) {
                toast.error('Failed to update column. Try again later.', { id: 'COLUMNS_UPDATE' });
                options?.onError?.(...args);
            },
        },
    );
}
