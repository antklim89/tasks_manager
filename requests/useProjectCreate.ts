import { toast } from 'react-hot-toast';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { ProjectType, projectSchema } from '@/schemas';
import { getBrowserClient, getBrowserUser } from '@/utils';

import { FetchProjectsKey } from './keys';


const TOAST_ID = 'PROJECT_CREATE';

type Options = SWRMutationConfiguration<ProjectType, Error, FetchProjectsKey, { name: string }>;

export function useProjectCreate(options?: Options) {
    return useSWRMutation<ProjectType, Error, FetchProjectsKey, { name: string }>(
        ['PROJECTS'],

        async (key, { arg: { name } }) => {
            toast.loading('Project is creating...', { id: TOAST_ID });
            const supabase = getBrowserClient();

            const user = await getBrowserUser();

            const { error, data } = await supabase.from('projects')
                .insert({ name, owner: user.id })
                .select('*')
                .single();

            if (error) throw error;

            return projectSchema.parseAsync(data);
        },
        {
            ...options,
            revalidate: false,
            populateCache(newProject, currentProjects: ProjectType[]) {
                return [...currentProjects, newProject];
            },
            onSuccess(...args) {
                toast.success('Project created succesfully.', { id: TOAST_ID });
                options?.onSuccess?.(...args);
            },
            onError(...args) {
                toast.error('Failed to create a project. Try again later.', { id: TOAST_ID });
                options?.onError?.(...args);
            },
        },
    );
}
