import { toast } from 'react-hot-toast';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { useProject } from '@/hooks';
import { ProjectType } from '@/schemas';
import { getSupabaseClient } from '@/supabase/client';

import { FetchProjectsKey } from './keys';


const TOAST_ID = 'PROJECT_DELETE';

type Options = SWRMutationConfiguration<void, Error, FetchProjectsKey, void>;

export function useProjectDelete(options?: Options) {
    const { projectId } = useProject();

    return useSWRMutation<void, Error, FetchProjectsKey, void>(
        ['PROJECTS'],

        async () => {
            toast.loading('Project is deleting...', { id: TOAST_ID });
            const supabase = await getSupabaseClient();

            const { error } = await supabase.from('projects')
                .delete()
                .eq('id', projectId);

            if (error) throw new Error('Failed to delete a project. Try again later.');
        },
        {
            ...options,
            revalidate: false,
            populateCache(_, currentProjects: ProjectType[]): ProjectType[] {
                return currentProjects.filter((project) => project.id !== projectId);
            },
            onSuccess(...args) {
                toast.success('Project deleted succesfully.', { id: TOAST_ID });
                options?.onSuccess?.(...args);
            },
            onError(err, ...args) {
                toast.error(err.message, { id: TOAST_ID });
                options?.onError?.(err, ...args);
            },
        },
    );
}
