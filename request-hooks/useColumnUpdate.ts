import { toast } from 'react-hot-toast';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { useColumnSelector, useProject } from '@/hooks';
import { ColumnType, ColumnUpdateType } from '@/schemas';
import { getSupabaseClient } from '@/supabase/client';

import { FetchColumnsKey } from './keys';


type Options = SWRMutationConfiguration<ColumnUpdateType, Error, FetchColumnsKey, ColumnUpdateType, ColumnType[]>;


export async function columnUpdate(columnId: number, data: ColumnUpdateType): Promise<ColumnUpdateType> {
    const supabase = await getSupabaseClient();

    const { error } = await supabase.from('columns')
        .update(data)
        .eq('id', columnId);

    if (error) throw error;

    return data;
}

export function useColumnUpdate(options?: Options) {
    const { projectId } = useProject();
    const columnId = useColumnSelector(column => column.id);
    
    return useSWRMutation<ColumnUpdateType, Error, FetchColumnsKey, ColumnUpdateType, ColumnType[]>(
        ['COLUMNS', { projectId }],
        (key, { arg }) => columnUpdate(columnId, arg),
        {
            ...options,
            revalidate: false,
            populateCache(result, currentColumns = []) {
                return currentColumns.map(((column) => (column.id === columnId ? { ...column, ...result } : column)));
            },
            onError(...args) {
                toast.error('Failed to update column. Try again later.', { id: 'COLUMNS_UPDATE' });
                options?.onError?.(...args);
            },
        },
    );
}
