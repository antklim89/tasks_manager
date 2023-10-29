'use client';
import { useDroppable, useDndContext } from '@dnd-kit/core';

import { TaskDropData } from '@/types';
import { cn } from '@/utils';

import { TaskDropProps } from './TaskDrop.types';


export const DROP_ZONE_HEIGHT = 40;
export const TASKS_GAP = 8;

const TaskDrop = ({ columnId, index, task }: TaskDropProps) => {
    const {
        setNodeRef,
        isOver,
    } = useDroppable({
        id: task?.id || `column ${columnId}`,
        data: { task, columnId, index, type: 'TASK' } satisfies TaskDropData,
    });

    const { active } = useDndContext();
    const isDragging = (active?.data.current as TaskDropData)?.type === 'TASK';

    const isActiveTask = (columnId === active?.data.current?.columnId)
        && (active?.data.current?.index === index || active?.data.current?.index === (index + 1));

    const taskHeight = active?.rect.current.translated?.height || 0;

    if (isActiveTask) return <div />;
    return (
        <div
            className={cn('-my-5 h-10', { 'z-50 transition-all': isDragging })}
            ref={setNodeRef}
            style={{ height: isOver ? taskHeight + (20 * 2) : undefined }}
        />
    );
};

export default TaskDrop;
