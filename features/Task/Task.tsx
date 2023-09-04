'use client';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { CSSProperties } from 'react';
import { FaEllipsisVertical } from 'react-icons/fa6';

import { Button, DateComponent, Menu } from '@/components';
import { useTaskUpdate } from '@/requests';
import { cn } from '@/utils';

import { TaskProps } from './Task.types';
import TaskDelete from './TaskDelete';


const Task = ({ task, index }: TaskProps) => {
    const { trigger: updateTask } = useTaskUpdate({ taskId: task.id, columnId: task.columnId });

    const {
        attributes,
        listeners,
        setNodeRef: setDragRef,
        transform,
        isDragging,
        active,
        over,
        node,
        activeNodeRect,
    } = useDraggable({
        id: task.id,
        data: {
            task,
            index,
            updateTask,
        },
    });

    const {
        setNodeRef: setDropRef,
        isOver,
    } = useDroppable({
        id: task.id,
        data: {
            task,
            index,
        },
    });

    const isNotOverArciveTask = active?.id !== over?.id;
    const isOverPreviousTask = Boolean(over
        && active
        && over.data.current
        && active.data.current
        && typeof over.data.current.index === 'number'
        && typeof active.data.current.index === 'number'
        && active.data.current.task.columnId === over.data.current.task.columnId
        && (over.data.current.index + 1 === active.data.current.index));

    const style: CSSProperties = {
        position: isDragging ? 'absolute' : 'static',
        top: node.current?.offsetTop,
        zIndex: isDragging ? 10 : 0,
        scale: isDragging ? 1.02 : 1,
        opacity: isDragging ? 0.5 : 1,
        transform: CSS.Translate.toString(transform),
    };

    return (
        <>
            {(isDragging) ? <div className="border border-primary" style={{ height: node.current?.offsetHeight }} /> : null}
            <div
                className={cn('w-full', { 'shadow-xl': isDragging })}
                ref={(e) => {
                    setDragRef(e);
                    setDropRef(e);
                }}
                style={style}
                {...attributes}
            >
                <div className="w-20 p-2 ml-auto mr-2 bg-primary" {...listeners}>
                    <div className="h-1 border-t border-b" />
                </div>
                <div className={cn('card p-2 bg-primary shadow-lg')}>
                    <div className="card-title flex justify-between">
                        {task.title}
                        <Menu button={<Button aria-label="user menu" color="ghost" size="sm"><FaEllipsisVertical /></Button>}>
                            <TaskDelete columnId={task.columnId} id={task.id} />
                        </Menu>
                    </div>

                    <div className="min-h-[28px] p-1">
                        {task.description}
                    </div>

                    <div className="card-actions">
                        <DateComponent date={task.completeAt} />
                    </div>
                </div>
                <div
                    className={cn('transition-all h-2', { 'h-52': isOver && isNotOverArciveTask })}
                    style={{ height: (isOver && (isNotOverArciveTask && !isOverPreviousTask) && activeNodeRect) ? activeNodeRect.height : '5px' }}
                />
            </div>
        </>
    );
};

export default Task;
