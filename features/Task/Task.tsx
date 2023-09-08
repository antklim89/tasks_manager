'use client';
import { FaEllipsisVertical, FaCalendarCheck } from 'react-icons/fa6';

import { Button, DateComponent, Menu } from '@/components';
import { useTaskDnd } from '@/hooks';
import { useTaskUpdate } from '@/requests';
import { useDisclosure } from '@/utils';

import { TaskProps } from './Task.types';
import TaskDelete from './TaskDelete';
import TaskFull from './TaskFull';
import TaskUpdate from './TaskUpdate';


const Task = ({ task, index }: TaskProps) => {
    const { isOpen, close, open } = useDisclosure();
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
            <TaskFull close={close} isOpen={isOpen} task={task} />
            <div
                className="w-full pb-2 text-left select-none"
                ref={(e) => {
                    setDragRef(e);
                    setDropRef(e);
                }}
                role="button"
                style={style}
                tabIndex={0}
                onDoubleClick={open}
            >
                <div className="w-16 ml-auto mr-2 p-1 bg-primary" {...listeners} {...attributes}>
                    <div className="h-1 border-t border-b" />
                </div>
                <div className="card w-full p-2 bg-primary shadow-lg">
                    <div className="card-title flex justify-between">
                        {task.title}
                        <Menu button={<Button aria-label="user menu" color="ghost" size="sm"><FaEllipsisVertical /></Button>}>
                            <TaskUpdate className="w-full btn-ghost" task={task} />
                            <TaskDelete className="w-full btn-ghost" task={task} />
                        </Menu>
                    </div>

                    {task.description
                        ? (
                            <div className="p-1">
                                {task.description.slice(0, 50)}
                                {task.description.length > 50 ? '...' : ''}
                            </div>
                        )
                        : null}

                    {task.completeAt
                        ? (
                            <div className="card-actions">
                                <FaCalendarCheck className="text-green-500" /><DateComponent date={task.completeAt} />
                            </div>
                        )
                        : null}
                </div>
            </div>

            {isDragging ? <div className="border border-primary" style={{ height: node.current?.offsetHeight }} /> : null}

            <div
                className="transition-all"
                style={{ height: (isOver && !isOverArciveTask && !isOverPreviousTask) ? activeHeight : '0px' }}
            />
        </>
    );
};

export default Task;


