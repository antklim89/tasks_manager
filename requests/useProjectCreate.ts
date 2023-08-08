import useSWRMutation from 'swr/mutation';

import { NewProjectType } from '@/features/NewProject/NewProject.schema';
import { ProjectType, projectSchema } from '@/schemas';
import { clientComponentClient, getClientComponentUser } from '@/utils';

import { FetchProjectsKey } from './keys';


export function useProjectCreate() {
    return useSWRMutation<ProjectType, Error, FetchProjectsKey, NewProjectType>(
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
            revalidate: false,
            populateCache(newProject, currentProjects: ProjectType[]) {
                return [...currentProjects, newProject];
            },
        },
    );
}
