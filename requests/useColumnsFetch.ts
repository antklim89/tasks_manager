import { toast } from 'react-hot-toast';
import useSWR, { SWRConfiguration } from 'swr';

import { useProject } from '@/hooks';
import { ColumnType, columnSchema } from '@/schemas';
import { getSupabaseClient } from '@/supabase/client';

import { FetchColumnsKey } from './keys';


type Options = SWRConfiguration<ColumnType[], Error>;

export function useColumnsFetch(options?: Options) {
    const { projectId } = useProject();
    return useSWR<ColumnType[], Error, FetchColumnsKey>(
        ['COLUMNS', { projectId }],

        async () => {
            const supabase = await getSupabaseClient();
            const { error, data } = await supabase
                .from('columns')
                .select('*')
                .order('id')
                .eq('projectId', projectId);

            if (error) throw error;
            return columnSchema.array().parseAsync(data);
        },
        {
            ...options,
            onError(...args) {
                toast.error('Failed to fetch columns. Try again later.', { id: 'COLUMNs_FETCH' });
                options?.onError?.(...args);
            },
        },
    );
}
