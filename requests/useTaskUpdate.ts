import { toast } from 'react-hot-toast';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { TaskCreateType, TaskType } from '@/schemas';
import { getBrowserClient, getBrowserUser } from '@/utils';

import { FetchTasksKey } from './keys';


export type TaskUpdateType = Partial<TaskCreateType> & { columnId?: number }
type Options = SWRMutationConfiguration<TaskUpdateType, Error, FetchTasksKey, TaskUpdateType>;

export function useTaskUpdate({ columnId, taskId }: { columnId: number, taskId: number }, options?: Options) {
    return useSWRMutation<TaskUpdateType, Error, FetchTasksKey, TaskUpdateType>(
        ['TASKS', { columnId }],

        async (key, { arg: updatedTask }) => {
            const supabase = getBrowserClient();
            const user = await getBrowserUser();

            const { error } = await supabase
                .from('tasks')
                .update(updatedTask)
                .eq('owner', user.id)
                .eq('id', taskId);

            if (error) throw error;
            return updatedTask;
        },
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
