import { toast } from 'react-hot-toast';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { useProject } from '@/hooks';
import { ColumnType, columnSchema } from '@/schemas';
import { getSupabaseClient } from '@/supabase/client';

import { FetchColumnsKey } from './keys';


const TOAST_ID = 'COLUMN_CREATE';

type Options = SWRMutationConfiguration<ColumnType, Error, FetchColumnsKey, void>;

export function useColumnCreate(options?: Options) {
    const { projectId } = useProject();

    return useSWRMutation<ColumnType, Error, FetchColumnsKey, void>(
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
            populateCache(newColumn, currentData: ColumnType[]) {
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
