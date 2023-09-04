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
        isNotOverArciveTask,
        isOverPreviousTask,
        attributes,
        listeners,
        setDragRef,
        activeNodeRect,
        setDropRef,
        isOver,
        isDragging,
        style,
        node,
    } = useTaskDnd({ task, index, updateTask });

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


