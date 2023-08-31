'use client';
import { useDrag } from 'react-dnd';
import { FaEllipsisVertical } from 'react-icons/fa6';
import { twMerge } from 'tailwind-merge';

import { Button, DateComponent, Menu } from '@/components';
import { useTaskUpdate } from '@/requests';

import { TaskProps } from './Task.types';
import TaskDelete from './TaskDelete';


const Task = ({ task }: TaskProps) => {
    const { trigger: updateTask } = useTaskUpdate({ taskId: task.id, columnId: task.columnId });

    const [{ isDragging }, ref] = useDrag({
        type: 'TASK',
        item: {
            task,
            updateTask,
        },
        collect: (m) => ({
            isDragging: m.isDragging(),
        }),
    });

    return (
        <div className={twMerge('card bg-primary shadow-lg', isDragging && 'opacity-50')} ref={ref}>
            <div className="card-body p-2">
                <div className="card-title flex justify-between">
                    {task.title}
                    <Menu button={<Button aria-label="user menu" color="ghost" size="sm"><FaEllipsisVertical /></Button>}>
                        <Menu.Item>
                            <TaskDelete columnId={task.columnId} id={task.id} />
                        </Menu.Item>
                    </Menu>
                </div>
                <div className="card-body p-1">
                    {task.description}
                </div>
                <div className="card-actions">
                    <DateComponent date={task.completeAt} />
                </div>
            </div>
        </div>
    );
};

export default Task;
