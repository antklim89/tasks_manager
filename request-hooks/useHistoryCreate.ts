import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { useProject } from '@/hooks';
import { historyCreate } from '@/requests';
import { HistoryType } from '@/schemas';

import { HistoryKey } from './keys';


type Options = SWRMutationConfiguration<HistoryType, Error, HistoryKey, { body: string }, HistoryType[]>;

export function useHistoryCreate(options?: Options) {
    const { projectId } = useProject();

    return useSWRMutation<HistoryType, Error, HistoryKey, { body: string }, HistoryType[]>(
        ['HISTORY', { projectId }],

        (_, { arg: { body } }) => {
            return historyCreate({ body, projectId });
        },
        {
            ...options,
            revalidate: false,
            populateCache(newColumn, currentData = []) {
                return [...currentData, newColumn];
            },
        },
    );
}
