import { toast } from 'react-hot-toast';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { useColumnSelector, useProject } from '@/hooks';
import { TaskCreateType, TaskType, taskSchema } from '@/schemas';
import { getSupabaseClient } from '@/supabase/client';

import { FetchTasksKey } from './keys';


const TOAST_ID = 'TASK_CREATE';

type Options = SWRMutationConfiguration<TaskType, Error, FetchTasksKey, TaskCreateType, TaskType[]>;

export function useTaskCreate(options?: Options) {
    const { projectId } = useProject();
    const columnId = useColumnSelector(column => column.id);

    return useSWRMutation<TaskType, Error, FetchTasksKey, TaskCreateType, TaskType[]>(
        ['TASKS', { columnId }],

        async (key, { arg }) => {
            toast.loading('Task is creating...', { id: TOAST_ID });
            const supabase = await getSupabaseClient();

            const { error, data } = await supabase
                .from('tasks')
                .insert({ projectId, columnId, ...arg })
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
            populateCache(newTask, currentData = []) {
                return [newTask, ...currentData];
            },
        },
    );
}
