import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { TaskCreateType, TaskType, taskSchema } from '@/schemas';
import { clientComponentClient, getClientComponentUser } from '@/utils';

import { FetchTasksKey } from './keys';


type Options = SWRMutationConfiguration<TaskType, Error, FetchTasksKey, TaskCreateType>;

export function useTaskCreate({ columnId }: { columnId: number }, options?: Options) {
    return useSWRMutation<TaskType, Error, FetchTasksKey, TaskCreateType>(
        ['TASKS', { columnId }],

        async (key, { arg: { title, completeAt, description } }) => {
            const supabase = clientComponentClient();

            const user = await getClientComponentUser();

            const { error, data } = await supabase
                .from('tasks')
                .insert({ title, description, completeAt, columnId, owner: user.id })
                .select('*')
                .single();
            // console.log('==  error\n', error);

            if (error) throw new Error('Failed to add new task. Try again later.');
            return taskSchema.parse(data);
        },
        {
            ...options,
            revalidate: false,
            populateCache(newTask, currentData?: TaskType[]) {
                return [...currentData || [], newTask];
            },
        },
    );
}
