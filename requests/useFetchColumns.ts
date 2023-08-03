import useSWR from 'swr';

import { clientComponentClient, getServerComponentUser } from '@/utils';

import { FetchColumnsKey } from './keys';


interface Data {
    id: number;
    name: string;
    owner: string;
    project: number;
}

export function useFetchColumns({ projectId }: { projectId: number }) {
    return useSWR<Data[], Error, FetchColumnsKey>(
        ['FETCH_COLUMNS', { projectId }],

        async ([, key]) => {
            const supabase = clientComponentClient();

            const user = await getServerComponentUser();

            const { error, data } = await supabase
                .from('columns')
                .select('*')
                .eq('project', key.projectId)
                .eq('owner', user.id);

            if (error) throw new Error('Failed to add new column. Try again later.');
            return data;
        },
    );
}
