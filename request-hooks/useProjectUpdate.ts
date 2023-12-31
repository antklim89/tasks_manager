import { toast } from 'react-hot-toast';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { ProjectType, ProjectUpdateType } from '@/schemas';
import { getSupabaseClient } from '@/supabase/client';

import { FetchProjectsKey } from './keys';


const TOAST_ID = 'PROJECT_UPDATE';

type Options = SWRMutationConfiguration<ProjectUpdateType, Error, FetchProjectsKey, ProjectUpdateType, ProjectType[]>;

export function useProjectUpdate({ id }: { id?: number }, options?: Options) {
    return useSWRMutation<ProjectUpdateType, Error, FetchProjectsKey, ProjectUpdateType, ProjectType[]>(
        ['PROJECTS'],

        async (key, { arg }) => {
            if (!id) throw new Error('Project id is required.');

            toast.loading('Project is updating...', { id: TOAST_ID });
            const supabase = await getSupabaseClient();

            const { error } = await supabase.from('projects')
                .update(arg)
                .eq('id', id);

            if (error) throw error;
            return arg;
        },
        {
            ...options,
            revalidate: false,
            populateCache(updatedProject, currentProjects = []) {
                return currentProjects.map((p) => (p.id === id ? { ...p, ...updatedProject } : p));
            },
            onSuccess(...args) {
                toast.success('Project updated succesfully.', { id: TOAST_ID });
                options?.onSuccess?.(...args);
            },
            onError(...args) {
                toast.error('Failed to update a project. Try again later.', { id: TOAST_ID });
                options?.onError?.(...args);
            },
        },
    );
}
