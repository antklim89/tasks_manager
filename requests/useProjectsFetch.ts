import useSWR, { SWRConfiguration } from 'swr';

import { ProjectType, projectSchema } from '@/schemas';
import { clientComponentClient, getClientComponentUser } from '@/utils';

import { FetchProjectsKey } from './keys';


type Options = SWRConfiguration<ProjectType[], Error>;

export function useProjectsFetch(options?: Options) {
    return useSWR<ProjectType[], Error, FetchProjectsKey>(
        ['PROJECTS'],

        async () => {
            const supabase = clientComponentClient();

            const user = await getClientComponentUser();

            const { error, data } = await supabase.from('projects')
                .select('*')
                .eq('owner', user.id);

            if (error) throw new Error('Failed to fetch projects. Try again later.');

            return projectSchema.array().parseAsync(data);
        },
        options,
    );
}
