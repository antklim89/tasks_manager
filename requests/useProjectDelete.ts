import { toast } from 'react-hot-toast';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { ProjectType } from '@/schemas';
import { getBrowserClient, getBrowserUser } from '@/utils';

import { FetchProjectsKey } from './keys';


const TOAST_ID = 'PROJECT_DELETE';

type Options = SWRMutationConfiguration<void, Error, FetchProjectsKey, void>;

export function useProjectDelete({ projectId }: { projectId: number }, options?: Options) {
    return useSWRMutation<void, Error, FetchProjectsKey, void>(
        ['PROJECTS'],

        async () => {
            toast.loading('Project is deleting...', { id: TOAST_ID });
            const supabase = getBrowserClient();
            const user = await getBrowserUser();

            const { error } = await supabase.from('projects')
                .delete()
                .eq('owner', user.id)
                .eq('id', projectId);

            if (error) throw error;
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
            onError(...args) {
                toast.error('Failed to delete a project. Try again later.', { id: TOAST_ID });
                options?.onError?.(...args);
            },
        },
    );
}
