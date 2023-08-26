import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { ColumnType } from '@/schemas';
import { clientComponentClient, getClientComponentUser } from '@/utils';

import { FetchColumnsKey } from './keys';


type Options = SWRMutationConfiguration<{name: string}, Error, FetchColumnsKey, {name: string}>;

export function useColumnUpdate({ columnId, projectId }: { columnId: number, projectId: number }, options?: Options) {
    return useSWRMutation<{name: string}, Error, FetchColumnsKey, {name: string}>(
        ['COLUMNS', { projectId }],

        async (key, { arg }) => {
            const supabase = clientComponentClient();
            const user = await getClientComponentUser();

            const { error } = await supabase.from('columns')
                .update(arg)
                .eq('id', columnId)
                .eq('owner', user.id);

            if (error) throw new Error('Failed to update column. Try again later.');

            return arg;
        },
        {
            ...options,
            revalidate: false,
            populateCache(result, columns: ColumnType[]) {
                return columns.map(((column) => (column.id === columnId ? { ...column, ...result } : column)));
            },
        },
    );
}
