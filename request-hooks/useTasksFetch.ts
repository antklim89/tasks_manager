import { toast } from 'react-hot-toast';
import useSWR, { SWRConfiguration } from 'swr';

import { TaskType, taskSchema } from '@/schemas';
import { getSupabaseClient } from '@/supabase/client';

import { FetchTasksKey } from './keys';


type Options = SWRConfiguration<TaskType[], Error>;

export function useTasksFetch({
    columnId,
    taskOrder,
}: {
    columnId: number,
    taskOrder: number[]|null
}, options?: Options) {
    return useSWR<TaskType[], Error, FetchTasksKey>(
        ['TASKS', { columnId }],

        async ([, key]) => {
            const supabase = await getSupabaseClient();

            const { error, data } = await supabase
                .from('tasks')
                .select('*')
                .eq('columnId', key.columnId);

            if (error) throw error;

            if (taskOrder) data.sort((a, b) => taskOrder.indexOf(a.id) - taskOrder.indexOf(b.id));
            return taskSchema.array().parseAsync(data);
        },
        {
            ...options,
            onError(...args) {
                toast.error('Failed to fetch tasks. Try again later.', { id: 'TASKS_FETCH' });
                options?.onError?.(...args);
            },
        },
    );
}
