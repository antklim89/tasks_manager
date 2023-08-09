import useSWR from 'swr';

import { ColumnType, columnSchema } from '@/schemas';
import { clientComponentClient, getClientComponentUser } from '@/utils';

import { FetchColumnsKey } from './keys';


export function useColumnsFetch({ projectId }: { projectId: number }) {
    return useSWR<ColumnType[], Error, FetchColumnsKey>(
        ['COLUMNS', { projectId }],

        async ([, key]) => {
            const supabase = clientComponentClient();

            const user = await getClientComponentUser();

            const { error, data } = await supabase
                .from('columns')
                .select('*')
                .eq('project', key.projectId)
                .eq('owner', user.id);

            if (error) throw new Error('Failed to fetch columns. Try again later.');
            return columnSchema.array().parseAsync(data);
        },
    );
}
