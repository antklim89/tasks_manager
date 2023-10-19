import { toast } from 'react-hot-toast';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { useProject } from '@/hooks';
import { TaskCreateType, TaskType, taskSchema } from '@/schemas';
import { getSupabaseClient } from '@/supabase/client';

import { FetchTasksKey } from './keys';


const TOAST_ID = 'TASK_CREATE';

type Options = SWRMutationConfiguration<TaskType, Error, FetchTasksKey, TaskCreateType>;

export function useTaskCreate({ columnId }: { columnId: number }, options?: Options) {
    const { projectId } = useProject();

    return useSWRMutation<TaskType, Error, FetchTasksKey, TaskCreateType>(
        ['TASKS', { columnId }],

        async (key, { arg: { title, completeAt, description } }) => {
            toast.loading('Task is creating...', { id: TOAST_ID });
            const supabase = await getSupabaseClient();

            const { error, data } = await supabase
                .from('tasks')
                .insert({ title, description, completeAt, columnId, projectId })
                .select('*')
                .single();

            if (error) throw error;
            return taskSchema.parse(data);
        },
        {
            ...options,
            onSuccess(...args) {
                toast.success('Task created succesfully.', { id: TOAST_ID });
                options?.onSuccess?.(...args);
            },
            onError(...args) {
                toast.error('Failed to create a task. Try again later.', { id: TOAST_ID });
                options?.onError?.(...args);
            },
            revalidate: false,
            populateCache(newTask, currentData?: TaskType[]) {
                return [newTask, ...currentData || []];
            },
        },
    );
}
