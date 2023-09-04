'use client';
import { FaEllipsisVertical } from 'react-icons/fa6';

import { Button, DateComponent, Menu } from '@/components';
import { useTaskDnd } from '@/hooks';
import { useTaskUpdate } from '@/requests';
import { cn } from '@/utils';

import { TaskProps } from './Task.types';
import TaskDelete from './TaskDelete';


const Task = ({ task, index }: TaskProps) => {
    const { trigger: updateTask } = useTaskUpdate({ taskId: task.id, columnId: task.columnId });
    const {
        isOverArciveTask,
        isOverPreviousTask,
        attributes,
        listeners,
        setDragRef,
        activeHeight,
        setDropRef,
        isOver,
        isDragging,
        style,
        node,
    } = useTaskDnd({ task, index, updateTask });

    return (
        <>
            <div
                ref={(e) => {
                    setDragRef(e);
                    setDropRef(e);
                }}
                style={style}
                {...attributes}
                className={cn('card w-full p-2 bg-primary shadow-lg')}
            >
                <div className="w-36 py-[2px] mx-auto bg-primary border-t border-b" {...listeners} />

                <div className="card-title flex justify-between">
                    {task.title}
                    <Menu button={<Button aria-label="user menu" color="ghost" size="sm"><FaEllipsisVertical /></Button>}>
                        <TaskDelete columnId={task.columnId} id={task.id} />
                    </Menu>
                </div>

                <div className="p-1">
                    {task.description}
                </div>

                <div className="card-actions">
                    <DateComponent date={task.completeAt} />
                </div>
            </div>

            {isDragging ? <div className="border border-primary" style={{ height: node.current?.offsetHeight }} /> : null}
            <div
                className="transition-all"
                style={{ height: (isOver && (!isOverArciveTask && !isOverPreviousTask)) ? activeHeight : '5px' }}
            />
        </>
    );
};

export default Task;


