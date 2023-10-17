import { toast } from 'react-hot-toast';
import useSWR, { SWRConfiguration } from 'swr';

import { useProject } from '@/hooks';
import { HistoryType, historySchema } from '@/schemas';
import { getBrowserClient } from '@/supabase/browser';

import type { HistoryKey } from './keys';


type Options = SWRConfiguration<HistoryType[], Error>;

export function useHistoryFetch(options?: Options) {
    const { projectId } = useProject();

    return useSWR<HistoryType[], Error, HistoryKey>(
        ['HISTORY', { projectId }],

        async () => {
            const supabase = getBrowserClient();

            const { error, data } = await supabase
                .from('history')
                .select('*')
                .eq('projectId', projectId);

            if (error) throw error;

            return historySchema.array().parseAsync(data);
        },
        {
            ...options,
            onError(...args) {
                toast.error('Failed to fetch history. Try again later.', { id: 'HISTORY_FETCH' });
                options?.onError?.(...args);
            },
        },
    );
}
