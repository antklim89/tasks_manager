'use client';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { FaEllipsisVertical } from 'react-icons/fa6';

import { Button, DateComponent, Menu } from '@/components';
import { useTaskUpdate } from '@/requests';
import { cn } from '@/utils';

import { TaskProps } from './Task.types';
import TaskDelete from './TaskDelete';


const Task = ({ task }: TaskProps) => {
    const { trigger: updateTask } = useTaskUpdate({ taskId: task.id, columnId: task.columnId });

    const {
        attributes,
        listeners,
        setNodeRef: setDragRef,
        transform,
        isDragging,
    } = useDraggable({
        id: task.id,
        data: {
            task,
        },
    });

    const {
        setNodeRef: setDropRef,
        isOver,
    } = useDroppable({
        id: task.id,
        data: {
            task,
        },
    });

    const style = {
        zIndex: isDragging ? 10 : 0,
        transform: CSS.Translate.toString(transform),
    };

    return (
        <div
            ref={setDragRef}
            style={style}
            {...attributes}
        >
            <div ref={setDropRef}>
                <Button {...listeners}>Drag</Button>
                <div className={cn('card p-2 bg-primary shadow-lg')}>
                    <div className="card-title flex justify-between">
                        {task.title} - {task.id}
                        <Menu button={<Button aria-label="user menu" color="ghost" size="sm"><FaEllipsisVertical /></Button>}>
                            <Menu.Item>
                                <TaskDelete columnId={task.columnId} id={task.id} />
                            </Menu.Item>
                        </Menu>
                    </div>

                    <div className="min-h-[28px] p-1">
                        {task.description}
                    </div>

                    <div className="card-actions">
                        <DateComponent date={task.completeAt} />
                    </div>
                </div>
                <div className={cn('transition-all h-2')} />
            </div>
            <div className={cn('h-2', { 'bg-red-600': isOver })} />
        </div>
    );
};

export default Task;
