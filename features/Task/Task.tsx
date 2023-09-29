'use client';
import { FaEllipsisVertical } from 'react-icons/fa6';

import { Button, Menu } from '@/components';
import { useDisclosure, useMember, useTaskDnd } from '@/hooks';
import { cn } from '@/utils';

import { TaskProps } from './Task.types';
import TaskCompleteDate from './TaskCompleteDate';
import TaskDelete from './TaskDelete';
import TaskStartDate from './TaskStartDate';
import TaskUpdate from './TaskUpdate';


const Task = ({ task, index }: TaskProps) => {
    const { isOpen: updateModalisOpen, close: closeUpdateModal, open: openUpdateModal } = useDisclosure();
    const { isAdminOrMember } = useMember();
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
    } = useTaskDnd({ task, index });

    return (
        <>
            <TaskUpdate close={closeUpdateModal} isOpen={updateModalisOpen} task={task} />
            <div
                className="w-full pb-2 text-left select-none"
                ref={(e) => {
                    setDragRef(e);
                    setDropRef(e);
                }}
                role="button"
                style={style}
                tabIndex={0}
                onDoubleClick={isAdminOrMember ? openUpdateModal : undefined}
            >
                {isAdminOrMember
                    ? (
                        <div className={cn('w-16 ml-auto mr-2 p-1 bg-primary cursor-grab', { 'cursor-grabbing': isDragging })} {...listeners} {...attributes}>
                            <div className="h-1 border-t border-b" />
                        </div>
                    )
                    : null}
                <div className="card w-full p-2 bg-primary shadow-lg">
                    <div className="card-title flex justify-between">
                        {task.title}
                        {isAdminOrMember
                            ? (
                                <Menu button={<Button aria-label="user menu" color="ghost" size="sm"><FaEllipsisVertical /></Button>}>
                                    <Button className="w-full btn-ghost" onClick={openUpdateModal}>Update</Button>
                                    <TaskDelete className="w-full btn-ghost" task={task} />
                                </Menu>
                            )
                            : null}
                    </div>

                    {task.description
                        ? (
                            <div className="p-1">
                                {task.description.slice(0, 50)}
                                {task.description.length > 50 ? '...' : ''}
                            </div>
                        )
                        : null}

                    <div className="flex flex-col items-start">
                        <TaskStartDate startAt={task.startAt} />
                        <TaskCompleteDate completeAt={task.completeAt} />
                    </div>
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


