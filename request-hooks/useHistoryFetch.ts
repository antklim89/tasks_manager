import { toast } from 'react-hot-toast';
import useSWRInfinite, { SWRInfiniteConfiguration, SWRInfiniteKeyLoader } from 'swr/infinite';

import { useProjectSelector }from '@/hooks';
import { HistoryType, historySchema } from '@/schemas';
import { getSupabaseClient } from '@/supabase/client';

import type { HistoryKey } from './keys';


type Options = SWRInfiniteConfiguration<HistoryType[], Error>;

export const HISTORY_LIMIT = 50;

export function useHistoryFetch({
    startDate,
}: {
    startDate?: string,
} = {}, options: Options = {}) {
    const projectId = useProjectSelector((project) => project.id);

    return useSWRInfinite<HistoryType[], Error, SWRInfiniteKeyLoader<HistoryType[], HistoryKey|undefined>>(
        (_, previousData) => {
            if (!previousData) return ['HISTORY', { projectId, startDate }];
            if (previousData.length < HISTORY_LIMIT) return undefined;
            const lastId = previousData.at(-1)?.id;

            return ['HISTORY', { projectId, startDate, lastId }];
        },

        async ([_, { lastId }]) => {
            const supabase = await getSupabaseClient();

            const supabaseQuery = supabase
                .from('history')
                .select('*, user:userId(email)')
                .order('id', { ascending: false })
                .limit(HISTORY_LIMIT)
                .eq('projectId', projectId);

            if (lastId) supabaseQuery.lt('id', lastId);
            if (startDate) supabaseQuery.lte('createdAt', startDate);

            const { error, data } = await supabaseQuery;


            if (error) throw new Error('Failed to fetch history. Try again later.');

            return historySchema.array().parseAsync(data);
        },
        {
            revalidateAll: false,
            revalidateFirstPage: false,
            ...options,
            onError(err, ...args) {
                toast.error(err.message, { id: 'HISTORY_FETCH' });
                options?.onError?.(err, ...args);
            },
        },
    );
}
