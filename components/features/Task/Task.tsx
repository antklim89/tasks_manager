'use client';
import { ReactNode } from 'react';
import { FaEllipsisVertical, FaFire, FaFireFlameSimple, FaLeaf } from 'react-icons/fa6';

import { Button, Menu, TaskDrag, TaskDrop } from '@/components';
import { useDisclosure, useMember, useTaskSelector } from '@/hooks';
import type { TaskPriorities } from '@/schemas';

import type { TaskProps } from './Task.types';
import TaskCompleteDate from './TaskCompleteDate';
import TaskDelete from './TaskDelete';
import TaskStartDate from './TaskStartDate';
import TaskUpdate from './TaskUpdate';


const priorityIcons: Record<TaskPriorities, ReactNode> = {
    'low': <FaLeaf className='text-green-300' />,
    'medium': null,
    'high': <FaFireFlameSimple className='text-yellow-500' />,
    'very high': <FaFire className='text-red-500' />,
};

// TODO: add who created task, add priorities, add color-coded labels and tags 
const Task = ({ index }: TaskProps) => {
    const taskTitle = useTaskSelector(task => task.title);
    const taskDescription = useTaskSelector(task => task.description);
    const taskPriority = useTaskSelector(task => task.priority);
    const { isOpen: updateModalisOpen, close: closeUpdateModal, open: openUpdateModal } = useDisclosure();
    const { isAdminOrUser: isAdminOrMember } = useMember();

    return (
        <>
            <TaskUpdate close={closeUpdateModal} isOpen={updateModalisOpen} />
            <TaskDrag
                className="w-full py-1 text-left select-none"
                index={index}
                role="button"
                tabIndex={0}
                onDoubleClick={isAdminOrMember ? openUpdateModal : undefined}
            >
                <div className="card w-full p-2 bg-primary shadow-lg">
                    <div className="card-title">
                        <div>{taskPriority ? priorityIcons[taskPriority] : null} </div>
                        <div>{taskTitle}</div>
                        {isAdminOrMember
                            ? (
                                <Menu button={<Button aria-label="task menu" color="ghost" size="sm"><FaEllipsisVertical /></Button>} className='ml-auto'>
                                    <Button className="w-full btn-ghost" onClick={openUpdateModal}>Update</Button>
                                    <TaskDelete className="w-full btn-ghost" />
                                </Menu>
                            )
                            : null}
                    </div>

                    {taskDescription
                        ? (
                            <div className="p-1">
                                {taskDescription.slice(0, 50)}
                                {taskDescription.length > 50 ? '...' : ''}
                            </div>
                        )
                        : null}

                    <div className="flex flex-col items-start">
                        <TaskStartDate />
                        <TaskCompleteDate />
                    </div>
                </div>
            </TaskDrag>

            <TaskDrop index={index} />
        </>
    );
};

export default Task;


