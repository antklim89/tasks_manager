import { useRef } from 'react';
import { toast } from 'react-hot-toast';
import useSWR, { SWRConfiguration } from 'swr';

import { useColumnSelector, useProjectDefaults } from '@/hooks';
import { tasksFetch } from '@/requests';
import { TaskType } from '@/schemas';

import { FetchTasksKey } from './keys';


type Options = SWRConfiguration<TaskType[], Error>

export function useTasksFetch(options: Options = {}) {
    const columnId = useColumnSelector(column => column.id);
    const taskOrder = useColumnSelector(column => column.taskOrder);
    const { defaultTasks } = useProjectDefaults();
    const defaultColumnTasks = defaultTasks?.[columnId];
    const isFirstFetch = useRef(true);

    return useSWR<TaskType[], Error, FetchTasksKey>(
        ['TASKS', { columnId }],

        async () => {
            if (isFirstFetch.current && defaultColumnTasks) {
                isFirstFetch.current = false;
                sortTasks(defaultColumnTasks, taskOrder);
                return defaultColumnTasks;
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

