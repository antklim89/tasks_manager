'use client';
import { useDroppable } from '@dnd-kit/core';


export function useTaskDrop(columnId: number) {
    const {
        setNodeRef, isOver, active, over,
    } = useDroppable({
        id: columnId,
        data: {
            index: -1,
            columnId,
        },
    });

    const isFirstTask = (active?.data.current?.columnId === over?.data.current?.columnId)
        && (active?.data.current?.index === 0);

    const activeHeight = active?.rect.current.initial?.height;

    return { setNodeRef, isOver, isFirstTask, activeHeight };
}
