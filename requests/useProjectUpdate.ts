import { toast } from 'react-hot-toast';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { ProjectType } from '@/schemas';
import { getBrowserClient, getBrowserUser } from '@/utils';

import { FetchProjectsKey } from './keys';


const TOAST_ID = 'PROJECT_CREATE';

type Options = SWRMutationConfiguration<{ name: string }, Error, FetchProjectsKey, { name: string }>;

export function useProjectUpdate({ id }: { id?: number }, options?: Options) {
    return useSWRMutation<{ name: string }, Error, FetchProjectsKey, { name: string }>(
        ['PROJECTS'],

        async (key, { arg: { name } }) => {
            if (!id) throw new Error('Project id is required.');

            toast.loading('Project is updating...', { id: TOAST_ID });
            const supabase = getBrowserClient();

            const user = await getBrowserUser();

            const { error } = await supabase.from('projects')
                .update({ name, owner: user.id })
                .eq('id', id);

            if (error) throw error;
            return { name };
        },
        {
            ...options,
            revalidate: false,
            populateCache(updatedProject, currentProjects: ProjectType[]) {
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
