import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { ProjectType, projectSchema } from '@/schemas';
import { clientComponentClient, getClientComponentUser } from '@/utils';

import { FetchProjectsKey } from './keys';


type Options = SWRMutationConfiguration<ProjectType, Error, FetchProjectsKey, { name: string }>;

export function useProjectCreate(options?: Options) {
    return useSWRMutation<ProjectType, Error, FetchProjectsKey, { name: string }>(
        ['PROJECTS'],

        async (key, { arg: { name } }) => {
            const supabase = clientComponentClient();

            const user = await getClientComponentUser();

            const { error, data } = await supabase.from('projects')
                .insert({ name, owner: user.id })
                .select('*')
                .single();

            if (error?.code === '23505') throw new Error(`Project with name "${name}" alerady exists.`);
            if (error) throw new Error('Failed to add new project. Try again later.');

            return projectSchema.parseAsync(data);
        },
        {
            populateCache(newProject, currentProjects: ProjectType[]) {
                return [...currentProjects, newProject];
            },
            ...options,
        },
    );
}
