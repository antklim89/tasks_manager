import { toast } from 'react-hot-toast';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { ProjectType, ProjectUpdateType, projectSchema } from '@/schemas';
import { getBrowserClient } from '@/supabase/browser';

import { FetchProjectsKey } from './keys';


const TOAST_ID = 'PROJECT_CREATE';

type Options = SWRMutationConfiguration<ProjectType, Error, FetchProjectsKey, ProjectUpdateType>;

export function useProjectCreate(options?: Options) {
    return useSWRMutation<ProjectType, Error, FetchProjectsKey, ProjectUpdateType>(
        ['PROJECTS'],

        async (key, { arg }) => {
            toast.loading('Project is creating...', { id: TOAST_ID });
            const supabase = getBrowserClient();

            const { data, error } = await supabase.rpc('create_project', arg);

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
