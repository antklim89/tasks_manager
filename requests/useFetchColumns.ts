import useSWR from 'swr';

import { clientComponentClient } from '@/utils';

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

            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error('You are not authenticated!');

            const { error, data } = await supabase
                .from('columns')
                .select('*')
                .eq('project', key.projectId)
                .eq('owner', session.user.id);

            if (error) throw new Error('Failed to add new column. Try again later.');
            return data;
        },
    );
}
