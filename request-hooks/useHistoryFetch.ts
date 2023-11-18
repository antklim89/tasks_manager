import { toast } from 'react-hot-toast';
import useSWRInfinite, { SWRInfiniteConfiguration, SWRInfiniteKeyLoader } from 'swr/infinite';

import { useProjectDefaults, useProjectSelector } from '@/hooks';
import { HISTORY_LIMIT, historyFetch } from '@/requests';
import { HistoryType } from '@/schemas';

import type { HistoryKey } from './keys';


type Options = SWRInfiniteConfiguration<HistoryType[], Error>;

export function useHistoryFetch(options: Options = {}) {
    const projectId = useProjectSelector((project) => project.id);
    const { defaultHistory, historyStartDate: startDate } = useProjectDefaults();


    return useSWRInfinite<HistoryType[], Error, SWRInfiniteKeyLoader<HistoryType[], HistoryKey|undefined>>(
        (_, previousData) => {
            if (!previousData) return ['HISTORY', { projectId, startDate }];
            if (previousData.length < HISTORY_LIMIT) return undefined;
            const lastId = previousData.at(-1)?.id;

            return ['HISTORY', { projectId, startDate, lastId }];
        },

        ([_, { lastId }]) => {
            if (lastId) return historyFetch({ projectId, lastId, startDate });
            return defaultHistory || historyFetch({ projectId, lastId, startDate });
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


