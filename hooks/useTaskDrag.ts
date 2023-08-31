import { useDrag } from 'react-dnd';

import { TaskType } from '@/schemas';


export const TASK_DRAG_TYPE = 'TASK';

export interface TaskDragItem {
    task: TaskType
    updateTask: (arg: { columnId: number }) => void
}


export function useTaskDrag({ task, updateTask }: TaskDragItem) {
    const [{ isDragging }, taskDragRef] = useDrag({
        type: TASK_DRAG_TYPE,
        item: {
            task,
            updateTask,
        },
        collect: (m) => ({
            isDragging: m.isDragging(),
        }),
    });

    return { taskDragRef, isDragging };
}
