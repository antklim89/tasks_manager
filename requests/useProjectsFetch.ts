import { toast } from 'react-hot-toast';
import useSWR, { SWRConfiguration } from 'swr';

import { ProjectType, projectSchema } from '@/schemas';
import { getBrowserClient, getBrowserUser } from '@/utils';

import { FetchProjectsKey } from './keys';


type Options = SWRConfiguration<ProjectType[], Error>;

export function useProjectsFetch(options?: Options) {
    return useSWR<ProjectType[], Error, FetchProjectsKey>(
        ['PROJECTS'],

        async () => {
            const supabase = getBrowserClient();

            const user = await getBrowserUser();

            const { error, data } = await supabase.from('projects')
                .select('*')
                .eq('owner', user.id);

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
