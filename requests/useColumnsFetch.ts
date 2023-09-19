import { toast } from 'react-hot-toast';
import useSWR, { SWRConfiguration } from 'swr';

import { ColumnType, columnSchema } from '@/schemas';
import { getBrowserClient, getBrowserUser } from '@/supabase/browser';

import { FetchColumnsKey } from './keys';


type Options = SWRConfiguration<ColumnType[], Error>;

export function useColumnsFetch({ projectId }: { projectId: number }, options?: Options) {
    return useSWR<ColumnType[], Error, FetchColumnsKey>(
        ['COLUMNS', { projectId }],

        async ([, key]) => {
            const supabase = getBrowserClient();

            const user = await getBrowserUser();

            const { error, data } = await supabase
                .from('columns')
                .select('*')
                .order('id')
                .eq('projectId', key.projectId)
                .eq('owner', user.id);

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
