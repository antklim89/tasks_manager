import { toast } from 'react-hot-toast';
import useSWR, { SWRConfiguration } from 'swr';

import { useProject } from '@/hooks';
import { HistoryType, historySchema } from '@/schemas';
import { getSupabaseClient } from '@/supabase/client';

import type { HistoryKey } from './keys';


type Options = SWRConfiguration<HistoryType[], Error>;

export function useHistoryFetch(options?: Options) {
    const { projectId } = useProject();

    return useSWR<HistoryType[], Error, HistoryKey>(
        ['HISTORY', { projectId }],

        async () => {
            const supabase = await getSupabaseClient();

            const { error, data } = await supabase
                .from('history')
                .select('*')
                .eq('projectId', projectId);

            if (error) throw new Error('Failed to fetch history. Try again later.');

            return historySchema.array().parseAsync(data);
        },
        {
            ...options,
            onError(err, ...args) {
                toast.error(err.message, { id: 'HISTORY_FETCH' });
                options?.onError?.(err, ...args);
            },
        },
    );
}
