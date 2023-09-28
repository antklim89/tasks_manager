import { toast } from 'react-hot-toast';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { ColumnType, ColumnUpdateType } from '@/schemas';
import { getBrowserClient } from '@/supabase/browser';

import { FetchColumnsKey } from './keys';


type Options = SWRMutationConfiguration<ColumnUpdateType, Error, FetchColumnsKey, ColumnUpdateType>;


export async function columnUpdate(columnId: number, data: ColumnUpdateType): Promise<ColumnUpdateType> {
    const supabase = getBrowserClient();

    const { error } = await supabase.from('columns')
        .update(data)
        .eq('id', columnId);

    if (error) throw error;

    return data;
}

export function useColumnUpdate({ columnId, projectId }: { columnId: number, projectId: number }, options?: Options) {
    return useSWRMutation<ColumnUpdateType, Error, FetchColumnsKey, ColumnUpdateType>(
        ['COLUMNS', { projectId }],
        (key, { arg }) => columnUpdate(columnId, arg),
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
