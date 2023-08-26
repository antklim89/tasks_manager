import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { ColumnType, columnSchema } from '@/schemas';
import { clientComponentClient, getClientComponentUser } from '@/utils';

import { FetchColumnsKey } from './keys';


type Options = SWRMutationConfiguration<ColumnType, Error, FetchColumnsKey, void>;

export function useColumnCreate({ projectId }: { projectId: number }, options?: Options) {
    return useSWRMutation<ColumnType, Error, FetchColumnsKey, void>(
        ['COLUMNS', { projectId }],

        async () => {
            const supabase = clientComponentClient();

            const user = await getClientComponentUser();

            const { error, data } = await supabase.from('columns')
                .insert({ name: 'New Column', owner: user.id, project: projectId })
                .select('*')
                .single();

            if (error) throw new Error('Failed to add new column. Try again later.');
            return columnSchema.parse(data);
        },
        {
            ...options,
            revalidate: false,
            populateCache(newColumn, currentData: ColumnType[]) {
                return [...currentData, newColumn];
            },
        },
    );
}
