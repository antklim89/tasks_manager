import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { useProject } from '@/hooks';
import { HistoryType, historySchema } from '@/schemas';
import { getSupabaseClient, getSupabaseUser } from '@/supabase/client';

import { HistoryKey } from './keys';


type Options = SWRMutationConfiguration<HistoryType, Error, HistoryKey, { body: string }, HistoryType[]>;

export function useHistoryCreate(options?: Options) {
    const { projectId } = useProject();

    return useSWRMutation<HistoryType, Error, HistoryKey, { body: string }, HistoryType[]>(
        ['HISTORY', { projectId }],

        async (_, { arg: { body } }) => {
            const supabase = await getSupabaseClient();
            const user = await getSupabaseUser();

            const { error, data } = await supabase.from('history')
                .insert({ projectId, body, userId: user.id })
                .select('*')
                .single();

            if (error) throw error;
            return historySchema.parse(data);
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
