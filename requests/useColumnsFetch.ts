import { toast } from 'react-hot-toast';
import useSWR, { SWRConfiguration } from 'swr';

import { useProjectId } from '@/hooks';
import { ColumnType, columnSchema } from '@/schemas';
import { getBrowserClient } from '@/supabase/browser';

import { FetchColumnsKey } from './keys';


type Options = SWRConfiguration<ColumnType[], Error>;

export function useColumnsFetch(options?: Options) {
    const projectId = useProjectId();
    return useSWR<ColumnType[], Error, FetchColumnsKey>(
        ['COLUMNS', { projectId }],

        async () => {
            const supabase = getBrowserClient();
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
