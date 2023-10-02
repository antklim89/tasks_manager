import { toast } from 'react-hot-toast';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { useProject } from '@/hooks';
import { ColumnType } from '@/schemas';
import { getBrowserClient } from '@/supabase/browser';

import { FetchColumnsKey } from './keys';


const TOAST_ID = 'COLUMN_DELETE';

type Options = SWRMutationConfiguration<void, Error, FetchColumnsKey, void>;

export function useColumnDelete({ columnId }: { columnId: number }, options?: Options) {
    const { projectId } = useProject();
    return useSWRMutation<void, Error, FetchColumnsKey, void>(
        ['COLUMNS', { projectId }],

        async () => {
            toast.loading('Column is deleting...', { id: TOAST_ID });
            const supabase = getBrowserClient();

            const { error } = await supabase.from('columns')
                .delete()
                .eq('id', columnId);

            if (error) throw error;
        },
        {
            ...options,
            throwOnError: false,
            revalidate: false,
            populateCache(result, columns: ColumnType[]) {
                return columns.filter((c) => c.id !== columnId);
            },
            onSuccess(...args) {
                toast.success('Column deleted succesfully.', { id: TOAST_ID });
                options?.onSuccess?.(...args);
            },
            onError(...args) {
                toast.error('Failed to delete a column. Try again later.', { id: TOAST_ID });
                options?.onError?.(...args);
            },
        },
    );
}
