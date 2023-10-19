import { toast } from 'react-hot-toast';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { TaskCreateType, TaskType } from '@/schemas';
import { getSupabaseClient } from '@/supabase/client';

import { FetchTasksKey } from './keys';


type Options = SWRMutationConfiguration<Partial<TaskCreateType>, Error, FetchTasksKey, Partial<TaskCreateType>>;

export async function taskUpdate(taskId: number, data: Partial<TaskCreateType>): Promise<Partial<TaskCreateType>> {
    const supabase = await getSupabaseClient();

    const { error } = await supabase
        .from('tasks')
        .update(data)
        .eq('id', taskId);

    if (error) throw error;
    return data;
}


export function useTaskUpdate({ columnId, taskId }: { columnId: number, taskId: number }, options?: Options) {
    return useSWRMutation<Partial<TaskCreateType>, Error, FetchTasksKey, Partial<TaskCreateType>>(
        ['TASKS', { columnId }],
        (key, { arg }) => taskUpdate(taskId, arg),
        {
            ...options,
            onError(...args) {
                toast.error('Failed to update a task. Try again later.', { id: 'TASK_UPDATE' });
                options?.onError?.(...args);
            },
            revalidate: false,
            populateCache(updatedTask, currentData?: TaskType[]) {
                return currentData
                    ?.map((i) => (i.id === taskId ? { ...i, ...updatedTask } : i))
                    .filter((i) => i.columnId === columnId);
            },
        },
    );
}
