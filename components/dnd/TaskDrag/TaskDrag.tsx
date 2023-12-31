'use client';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { CSSProperties } from 'react';

import { useColumn, useTask } from '@/hooks';
import { TaskDragData } from '@/types';
import { cn } from '@/utils';

import { TaskDragProps } from './TaskDrag.types';


const TaskDrag = ({ index, children, className, ...props }: TaskDragProps) => {
    const column = useColumn();
    const task = useTask();

    const {
        attributes,
        listeners,
        setNodeRef: setDragRef,
        transform,
        isDragging,
        node,
    } = useDraggable({
        id: task.id,
        data: {
            task,
            column,
            index,
            type: 'TASK',
        } satisfies TaskDragData,
    });

    const style: CSSProperties = {
        position: isDragging ? 'absolute' : 'static',
        top: node.current?.offsetTop,
        zIndex: isDragging ? 10 : undefined,
        opacity: isDragging ? 0.8 : undefined,
        scale: isDragging ? 1.05 : undefined,
        transform: CSS.Translate.toString(transform),
    };

    return (
        <>
            <div
                ref={setDragRef}
                {...listeners}
                {...attributes}
                style={style}
                {...props}
                className={cn('left-0 right-0', className)}
            >
                {children}
            </div>
            {isDragging ? <div className="border border-primary" style={{ height: node.current?.offsetHeight }} /> : null}
        </>
    );
};

export default TaskDrag;
