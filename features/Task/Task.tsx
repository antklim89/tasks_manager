'use client';
import { FaEllipsisVertical } from 'react-icons/fa6';
import { createContext } from 'use-context-selector';

import { Button, Menu, TaskDrag } from '@/components';
import TaskDrop from '@/components/TaskDrop';
import { useDisclosure, useMember } from '@/hooks';
import { type TaskType } from '@/schemas';

import { TaskProps } from './Task.types';
import TaskCompleteDate from './TaskCompleteDate';
import TaskDelete from './TaskDelete';
import TaskStartDate from './TaskStartDate';
import TaskUpdate from './TaskUpdate';


export const TaskContext = createContext<TaskType|null>(null);

const Task = ({ task, index }: TaskProps) => {
    const { isOpen: updateModalisOpen, close: closeUpdateModal, open: openUpdateModal } = useDisclosure();
    const { isAdminOrUser: isAdminOrMember } = useMember();

    return (
        <TaskContext.Provider value={task}>
            <TaskUpdate close={closeUpdateModal} isOpen={updateModalisOpen} />
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
                                    <TaskDelete className="w-full btn-ghost" />
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
                        <TaskStartDate />
                        <TaskCompleteDate />
                    </div>
                </div>
            </TaskDrag>

            <TaskDrop
                index={index}
                task={task}
            />
        </TaskContext.Provider>
    );
};

export default Task;


