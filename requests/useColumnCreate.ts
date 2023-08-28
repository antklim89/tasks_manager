import { toast } from 'react-hot-toast';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { ColumnType, columnSchema } from '@/schemas';
import { getBrowserClient, getBrowserUser } from '@/utils';

import { FetchColumnsKey } from './keys';


type Options = SWRMutationConfiguration<ColumnType, Error, FetchColumnsKey, void>;

export function useColumnCreate({ projectId }: { projectId: number }, options?: Options) {
    return useSWRMutation<ColumnType, Error, FetchColumnsKey, void>(
        ['COLUMNS', { projectId }],

        async () => {
            const supabase = getBrowserClient();

            const user = await getBrowserUser();

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
            onSuccess() {
                toast.success('Column created succesfully.');
            },
            onError() {
                toast.error('Failed to create a column. Try again later.');
            },
        },
    );
}
