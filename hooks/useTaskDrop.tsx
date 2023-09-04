'use client';
import { useDroppable } from '@dnd-kit/core';

import { TaskDropData } from '@/types';


export function useTaskDrop(columnId: number) {
    const {
        setNodeRef, isOver, active, over,
    } = useDroppable({
        id: `column ${columnId}`,
        data: {
            columnId,
        } satisfies TaskDropData,
    });

    const isFirstTask = (active?.data.current?.columnId === over?.data.current?.columnId)
        && (active?.data.current?.index === 0);

    const activeHeight = active?.rect.current.initial?.height;

    return { setNodeRef, isOver, isFirstTask, activeHeight };
}
