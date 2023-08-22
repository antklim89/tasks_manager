import useSWR from 'swr';

import { TaskType, taskSchema } from '@/schemas';
import { clientComponentClient, getClientComponentUser } from '@/utils';

import { FetchTasksKey } from './keys';


export function useTasksFetch({ columnId }: { columnId: number }) {
    return useSWR<TaskType[], Error, FetchTasksKey>(
        ['TASKS', { columnId }],

        async ([, key]) => {
            const supabase = clientComponentClient();

            const user = await getClientComponentUser();

            const { error, data } = await supabase
                .from('tasks')
                .select('*')
                .eq('columnId', key.columnId)
                .eq('owner', user.id);

            if (error) throw new Error('Failed to fetch tasks. Try again later.');
            return taskSchema.array().parseAsync(data);
        },
    );
}