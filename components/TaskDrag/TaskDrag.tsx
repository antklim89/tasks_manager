'use client';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { CSSProperties } from 'react';

import { TaskDragData } from '@/types';

import { TaskDragProps } from './TaskDrag.types';


const TaskDrag = ({ index, task, children, ...props }: TaskDragProps) => {
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
            columnId: task.columnId,
            index,
            type: 'TASK',
        } satisfies TaskDragData,
    });

    const style: CSSProperties = {
        position: isDragging ? 'absolute' : 'static',
        top: node.current?.offsetTop,
        zIndex: isDragging ? 10 : undefined,
        opacity: isDragging ? 0.8 : undefined,
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
            >
                {children}
            </div>
            {isDragging ? <div className="border border-primary" style={{ height: node.current?.offsetHeight }} /> : null}
        </>
    );
};

export default TaskDrag;
