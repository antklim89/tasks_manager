import { toast } from 'react-hot-toast';
import useSWR, { SWRConfiguration } from 'swr';

import { ProjectType, projectSchema } from '@/schemas';
import { getBrowserClient } from '@/supabase/browser';

import { FetchProjectsKey } from './keys';


type Options = SWRConfiguration<ProjectType[], Error>;

export function useProjectsFetch({ id }: { id?: number } = {}, options: Options = {}) {
    return useSWR<ProjectType[], Error, FetchProjectsKey>(
        ['PROJECTS'],

        async () => {
            const supabase = getBrowserClient();
            const supabaseQuery = supabase.from('projects').select('*');

            if (id) supabaseQuery.eq('id', null);

            const { error, data } = await supabaseQuery;
            if (error) throw error;

            return projectSchema.array().parseAsync(data);
        },
        {
            ...options,
            onError(...args) {
                toast.error('Failed to fetch projects. Try again later.', { id: 'PROJECTS_FETCH' });
                options?.onError?.(...args);
            },
        },
    );
}
