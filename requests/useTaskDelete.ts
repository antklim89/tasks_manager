import { toast } from 'react-hot-toast';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { TaskType } from '@/schemas';
import { getBrowserClient } from '@/supabase/browser';

import { FetchTasksKey } from './keys';


const TOAST_ID = 'TASK_DELETE';

type Options = SWRMutationConfiguration<unknown, Error, FetchTasksKey, unknown>;

export function useTaskDelete({ taskId, columnId }: { columnId: number, taskId: number }, options?: Options) {
    return useSWRMutation<unknown, Error, FetchTasksKey, unknown>(
        ['TASKS', { columnId }],

        async () => {
            toast.loading('Task is deleting...', { id: TOAST_ID });
            const supabase = getBrowserClient();


            const { error } = await supabase
                .from('tasks')
                .delete()
                .eq('id', taskId);

            if (error) throw error;
        },
        {
            ...options,
            revalidate: false,
            populateCache(_, currentTasks?: TaskType[]) {
                return currentTasks?.filter(({ id }) => id !== taskId);
            },
            onSuccess(...args) {
                toast.success('Task deleted.', { id: TOAST_ID });
                options?.onSuccess?.(...args);
            },
            onError(...args) {
                toast.error('Failed to delete a task. Try again later.', { id: TOAST_ID });
                options?.onError?.(...args);
            },
        },
    );
}
