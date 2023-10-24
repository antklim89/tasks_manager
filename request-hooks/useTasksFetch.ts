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

        () => {
            if (isFirstFetch.current && defaultValue) {
                isFirstFetch.current = false;
                return defaultValue;
            }

            return tasksFetch({ columnId, taskOrder });
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


