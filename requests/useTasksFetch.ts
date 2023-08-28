import { toast } from 'react-hot-toast';
import useSWR, { SWRConfiguration } from 'swr';

import { TaskType, taskSchema } from '@/schemas';
import { getBrowserClient, getBrowserUser } from '@/utils';

import { FetchTasksKey } from './keys';


type Options = SWRConfiguration<TaskType[], Error>;

export function useTasksFetch({ columnId }: { columnId: number }, options?: Options) {
    return useSWR<TaskType[], Error, FetchTasksKey>(
        ['TASKS', { columnId }],

        async ([, key]) => {
            const supabase = getBrowserClient();

            const user = await getBrowserUser();

            const { error, data } = await supabase
                .from('tasks')
                .select('*')
                .eq('columnId', key.columnId)
                .eq('owner', user.id);

            if (error) throw error;
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
