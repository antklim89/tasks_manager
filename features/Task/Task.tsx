'use client';
import { FaEllipsisVertical } from 'react-icons/fa6';

import { Button, Menu, TaskDrag } from '@/components';
import TaskDrop from '@/components/TaskDrop';
import { useDisclosure, useMember } from '@/hooks';

import { TaskProps } from './Task.types';
import TaskCompleteDate from './TaskCompleteDate';
import TaskDelete from './TaskDelete';
import TaskStartDate from './TaskStartDate';
import TaskUpdate from './TaskUpdate';


const Task = ({ task, index }: TaskProps) => {
    const { isOpen: updateModalisOpen, close: closeUpdateModal, open: openUpdateModal } = useDisclosure();
    const { isAdminOrUser: isAdminOrMember } = useMember();


    return (
        <>
            <TaskUpdate close={closeUpdateModal} isOpen={updateModalisOpen} task={task} />
            <TaskDrag
                className="w-full py-1 text-left select-none"
                index={index}
                role="button"
                tabIndex={0}
                task={task}
                onDoubleClick={isAdminOrMember ? openUpdateModal : undefined}
            >
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
            </TaskDrag>

            <TaskDrop
                columnId={task.columnId}
                index={index}
                task={task}
            />
        </>
    );
};

export default Task;


