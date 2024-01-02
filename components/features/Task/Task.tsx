'use client';
import { CSSProperties, ReactNode, useMemo } from 'react';
import {
    FaComment,
    FaEllipsisVertical, 
    FaFire, 
    FaFireFlameSimple,
    FaIcicles, FaLeaf,
} from 'react-icons/fa6';

import { Button, Menu, TaskDrag, TaskDrop } from '@/components';
import { useDisclosure, useMember, useTaskSelector } from '@/hooks';
import type { TaskPriorities } from '@/schemas';
import { contrastingColor } from '@/utils';

import type { TaskProps } from './Task.types';
import TaskComments from './TaskComments';
import TaskCompleteDate from './TaskCompleteDate';
import TaskDelete from './TaskDelete';
import TaskStartDate from './TaskStartDate';
import TaskUpdate from './TaskUpdate';


const priorityIcons: Record<TaskPriorities, ReactNode> = {
    'frozen': <FaIcicles className='text-cyan-500' />,
    'low': <FaLeaf className='text-green-300' />,
    'medium': null,
    'high': <FaFireFlameSimple className='text-yellow-500' />,
    'very high': <FaFire className='text-red-500' />,
};

const Task = ({ index }: TaskProps) => {
    const taskTitle = useTaskSelector(task => task.title);
    const taskDescription = useTaskSelector(task => task.description);
    const taskPriority = useTaskSelector(task => task.priority);
    const taskColor = useTaskSelector(task => task.color);
    const { isOpen: updateModalIsOpen, close: closeUpdateModal, open: openUpdateModal } = useDisclosure();
    const { isOpen: commentModalIsOpen, close: closeCommentModal, open: openCommentModal } = useDisclosure();
    const { isAdminOrUser: isAdminOrMember } = useMember();

    const taskColorStyle: CSSProperties | undefined = useMemo(() => {
        if (!taskColor) return undefined;
        return {
            backgroundColor: `#${taskColor}`,
            color: `#${contrastingColor(taskColor)}`,
        };
    }, [taskColor]);


    return (
        <>
            <TaskUpdate close={closeUpdateModal} isOpen={updateModalIsOpen} />
            <TaskComments close={closeCommentModal} isOpen={commentModalIsOpen} />
            <TaskDrag
                className="w-full py-1 text-left select-none"
                index={index}
                role="button"
                tabIndex={0}
                onDoubleClick={isAdminOrMember ? openUpdateModal : undefined}
            >
                <div className="flex justify-between p-1 w-full bg-primary shadow-lg" style={taskColorStyle}>
                    <div className='flex flex-col'>
                        <div className="flex items-center text-lg">
                            {taskPriority ? <div className='mr-2'> {priorityIcons[taskPriority]}</div> : null} 
                            <div>{taskTitle}</div>
                        </div>

                        {taskDescription
                            ? (
                                <div className="p-1">
                                    {taskDescription.slice(0, 50)}
                                    {taskDescription.length > 50 ? '...' : ''}
                                </div>
                            )
                            : null}

                        <div className="flex flex-col items-start text-sm">
                            <TaskStartDate />
                            <TaskCompleteDate />
                        </div>
                    </div>
                    <div className='flex flex-col justify-between'>
                        {isAdminOrMember
                            ? (
                                <Menu
                                    button={(
                                        <Button
                                            aria-label="task menu"
                                            color="ghost"
                                            size="sm"
                                        >
                                            <FaEllipsisVertical />
                                        </Button>
                                    )}
                                    className='ml-auto'
                                    listClassName='text-slate-200' 
                                >
                                    <Button className="w-full btn-ghost" onClick={openUpdateModal}>Update</Button>
                                    <TaskDelete className="w-full btn-ghost" />
                                </Menu>
                            )
                            : null}
                        <Button
                            aria-label='open comment modal'
                            color='ghost'
                            size='xs'
                            onClick={openCommentModal}
                        >
                            <FaComment />
                        </Button>
                    </div>
                </div>
            </TaskDrag>
            <TaskDrop index={index} />
        </>
    );
};

export default Task;
