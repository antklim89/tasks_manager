import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { ProjectType } from '@/schemas';
import { getBrowserClient, getBrowserUser } from '@/utils';

import { FetchProjectsKey } from './keys';


type Options = SWRMutationConfiguration<void, Error, FetchProjectsKey, void>;

export function useProjectDelete({ projectId }: { projectId: number }, options?: Options) {
    return useSWRMutation<void, Error, FetchProjectsKey, void>(
        ['PROJECTS'],

        async () => {
            const supabase = getBrowserClient();
            const user = await getBrowserUser();

            const { error } = await supabase.from('projects')
                .delete()
                .eq('owner', user.id)
                .eq('id', projectId);

            if (error) throw new Error('Failed to remove project. Try again later.');
        },
        {
            revalidate: false,
            populateCache(_, currentProjects: ProjectType[]): ProjectType[] {
                return currentProjects.filter((project) => project.id !== projectId);
            },
            ...options,
        },
    );
}
