import { useRef } from 'react';
import { toast } from 'react-hot-toast';
import useSWR, { SWRConfiguration } from 'swr';

import { tasksFetch } from '@/requests';
import { TaskType } from '@/schemas';

import { FetchTasksKey } from './keys';


type Options = SWRConfiguration<TaskType[], Error> & { defaultValue?: TaskType[] };

export function useTasksFetch({
    columnId,
    taskOrder,
}: {
    columnId: number,
    taskOrder: number[]|null
}, { defaultValue, ...options }: Options = {}) {
    const isFirstFetch = useRef(true);

    return useSWR<TaskType[], Error, FetchTasksKey>(
        ['TASKS', { columnId }],

        async () => {
            if (isFirstFetch.current && defaultValue) {
                isFirstFetch.current = false;
                sortTasks(defaultValue, taskOrder);
                return defaultValue;
            }

            const tasks = await tasksFetch({ columnId });
            sortTasks(tasks, taskOrder);
            return tasks;
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


function sortTasks(tasks: TaskType[], taskOrder?: number[] | null) {
    if (taskOrder) tasks.sort((a, b) => taskOrder.indexOf(a.id) - taskOrder.indexOf(b.id));
}

