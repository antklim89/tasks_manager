import { toast } from 'react-hot-toast';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { useProjectSelector }from '@/hooks';
import { ColumnType, columnSchema } from '@/schemas';
import { getSupabaseClient } from '@/supabase/client';

import { FetchColumnsKey } from './keys';


const TOAST_ID = 'COLUMN_CREATE';

type Options = SWRMutationConfiguration<ColumnType, Error, FetchColumnsKey, void, ColumnType[]>;

export function useColumnCreate(options?: Options) {
    const projectId = useProjectSelector((project) => project.id);

    return useSWRMutation<ColumnType, Error, FetchColumnsKey, void, ColumnType[]>(
        ['COLUMNS', { projectId }],

        async () => {
            toast.loading('Column is creating...', { id: TOAST_ID });
            const supabase = await getSupabaseClient();

            const { error, data } = await supabase.from('columns')
                .insert({ name: 'New Column', projectId })
                .select('*')
                .single();

            if (error) throw error;
            return columnSchema.parse(data);
        },
        {
            ...options,
            revalidate: false,
            populateCache(newColumn, currentData = []) {
                return [...currentData, newColumn];
            },
            onSuccess(...args) {
                toast.success('Column created succesfully.', { id: TOAST_ID });
                options?.onSuccess?.(...args);
            },
            onError(...args) {
                toast.error('Failed to create a column. Try again later.', { id: TOAST_ID });
                options?.onError?.(...args);
            },
        },
    );
}
