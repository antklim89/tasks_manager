'use client';
import { useDroppable, useDndContext } from '@dnd-kit/core';

import { TaskDropData } from '@/types';
import { cn } from '@/utils';

import { TaskDropProps } from './TaskDrop.types';


const TaskDrop = ({ columnId, index, task }: TaskDropProps) => {
    const {
        setNodeRef,
        isOver,
        over,
    } = useDroppable({
        id: task?.id || `column ${columnId}`,
        data: { task, columnId, index, type: 'TASK' } satisfies TaskDropData,
    });

    const { active } = useDndContext();
    const isDragging = Boolean(active);


    if ((over?.data.current && active?.data.current) && (over.data.current?.columnId === active.data.current?.columnId) && ((over.data.current.index === active.data.current.index) || (over.data.current.index === active.data.current.index - 1))) return <div className="h-2" />;
    return (
        <div
            className={cn('-my-4', { 'm-0X': isOver, 'z-50 transition-all': isDragging })}
            ref={setNodeRef}
            style={{ height: isOver ? (active?.rect.current.translated?.height || 40) + 32 : 40 }}
        />
    );
};

export default TaskDrop;
