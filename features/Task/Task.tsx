'use client';
import { FaEllipsisVertical } from 'react-icons/fa6';

import { Button, Menu, TaskDrag } from '@/components';
import TaskDrop from '@/components/TaskDrop';
import { useDisclosure, useMember, useTaskSelector } from '@/hooks';

import { TaskProps } from './Task.types';
import TaskCompleteDate from './TaskCompleteDate';
import TaskDelete from './TaskDelete';
import TaskStartDate from './TaskStartDate';
import TaskUpdate from './TaskUpdate';


const Task = ({ index }: TaskProps) => {
    const taskTitle = useTaskSelector(task => task.title);
    const taskDescription = useTaskSelector(task => task.description);
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
                    <div className="card-title flex justify-between">
                        {taskTitle}
                        {isAdminOrMember
                            ? (
                                <Menu button={<Button aria-label="user menu" color="ghost" size="sm"><FaEllipsisVertical /></Button>}>
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


