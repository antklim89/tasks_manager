import { toast } from 'react-hot-toast';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { TaskCreateType, TaskType, taskSchema } from '@/schemas';
import { getBrowserClient, getBrowserUser } from '@/utils';

import { FetchTasksKey } from './keys';


const TOAST_ID = 'TASK_CREATE';

type Options = SWRMutationConfiguration<TaskType, Error, FetchTasksKey, TaskCreateType>;

export function useTaskCreate({ columnId }: { columnId: number }, options?: Options) {
    return useSWRMutation<TaskType, Error, FetchTasksKey, TaskCreateType>(
        ['TASKS', { columnId }],

        async (key, { arg: { title, completeAt, description } }) => {
            toast.loading('Task is creating...', { id: TOAST_ID });
            const supabase = getBrowserClient();

            const user = await getBrowserUser();

            const { error, data } = await supabase
                .from('tasks')
                .insert({ title, description, completeAt, columnId, owner: user.id })
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
                return [...currentData || [], newTask];
            },
        },
    );
}
