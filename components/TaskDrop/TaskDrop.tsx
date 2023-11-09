'use client';
import { useDroppable, useDndContext } from '@dnd-kit/core';

import { useColumn, useTask } from '@/hooks';
import { TaskDropData } from '@/types';
import { cn } from '@/utils';

import { TaskDropProps } from './TaskDrop.types';


const TaskDrop = ({ index }: TaskDropProps) => {
    const column = useColumn();
    const task = useTask(false);
    
    const {
        setNodeRef,
        isOver,
    } = useDroppable({
        id: task?.id || `column ${column.id}`,
        data: { task: task|| undefined, index, type: 'TASK', column } satisfies TaskDropData,
    });

    const { active } = useDndContext();
    const isDragging = (active?.data.current as TaskDropData)?.type === 'TASK';

    const isActiveTask = (column.id === active?.data.current?.column.id)
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
