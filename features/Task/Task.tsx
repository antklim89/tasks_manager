'use client';
import { FaEllipsisVertical } from 'react-icons/fa6';

import { Button, Menu } from '@/components';
import TaskDrop from '@/components/TaskDrop';
import { useDisclosure, useMember, useTaskDnd } from '@/hooks';

import { TaskProps } from './Task.types';
import TaskCompleteDate from './TaskCompleteDate';
import TaskDelete from './TaskDelete';
import TaskStartDate from './TaskStartDate';
import TaskUpdate from './TaskUpdate';


const Task = ({ task, index }: TaskProps) => {
    const { isOpen: updateModalisOpen, close: closeUpdateModal, open: openUpdateModal } = useDisclosure();
    const { isAdminOrUser: isAdminOrMember } = useMember();
    const {
        attributes,
        listeners,
        setDragRef,
        isDragging,
        style,
        node,
    } = useTaskDnd({ task, index });

    return (
        <>
            <TaskUpdate close={closeUpdateModal} isOpen={updateModalisOpen} task={task} />
            <div
                className="w-full pb-2 text-left select-none"
                ref={setDragRef}
                {...listeners} {...attributes}
                role="button"
                style={style}
                tabIndex={0}
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
            </div>

            {isDragging ? <div className="border border-primary" style={{ height: node.current?.offsetHeight }} /> : null}

            <TaskDrop
                columnId={task.columnId}
                index={index}
                task={task}
            />
        </>
    );
};

export default Task;


