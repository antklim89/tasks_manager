import { useDrop } from 'react-dnd';
import { useSWRConfig } from 'swr';

import { FetchTasksKey } from '@/requests/keys';
import { TaskType } from '@/schemas';

import type { TaskDragItem } from './useTaskDrag';


export function useTaskDrop({
    columnId,
}: {
    columnId: number
}) {
    const { mutate } = useSWRConfig();
    const [{ isOver }, taskDropRef] = useDrop<TaskDragItem, unknown, { isOver: boolean}>({
        accept: 'TASK',
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
        async drop({ task, updateTask }) {
            if (task.columnId === columnId) return;
            await updateTask({ columnId });
            mutate(
                ['TASKS', { columnId }] satisfies FetchTasksKey,
                (currentData?: TaskType[]) => [...(currentData || []), { ...task, columnId }],
                { revalidate: false },
            );
        },
    });

    return { isOver, taskDropRef };
}
