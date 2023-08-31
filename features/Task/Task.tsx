'use client';
import { FaEllipsisVertical } from 'react-icons/fa6';

import { Button, DateComponent, Menu } from '@/components';
import { useTaskDrag, useTaskDrop } from '@/hooks';
import { useTaskUpdate } from '@/requests';
import { cn } from '@/utils';

import { TaskProps } from './Task.types';
import TaskDelete from './TaskDelete';


const Task = ({ task }: TaskProps) => {
    const { trigger: updateTask } = useTaskUpdate({ taskId: task.id, columnId: task.columnId });

    const { isDragging, taskDragRef } = useTaskDrag({ task, updateTask });
    const { isOver, taskDropRef } = useTaskDrop({ columnId: task.columnId });

    return (
        <div ref={taskDropRef}>
            <div className={cn('card p-2 bg-primary shadow-lg', { 'opacity-50': isDragging })} ref={taskDragRef}>
                <div className="card-title flex justify-between">
                    {task.title}
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
            <div className={cn('transition-all h-2', { 'h-12 bg-green-500': isOver })} />
        </div>
    );
};

export default Task;
