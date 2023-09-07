'use client';
import { FaEllipsisVertical } from 'react-icons/fa6';

import { Button, DateComponent, Menu } from '@/components';
import { useTaskDnd } from '@/hooks';
import { useTaskUpdate } from '@/requests';

import { TaskProps } from './Task.types';
import TaskDelete from './TaskDelete';
import TaskUpdate from './TaskUpdate';


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
                className="w-full pb-2"
                ref={(e) => {
                    setDragRef(e);
                    setDropRef(e);
                }}
                style={style}
            >
                <div className="w-16 ml-auto mr-2 p-1 bg-primary" {...listeners} {...attributes}>
                    <div className="h-1 border-t border-b" />
                </div>
                <div className="card w-full p-2 bg-primary shadow-lg">
                    <div className="card-title flex justify-between">
                        {task.title}
                        <Menu button={<Button aria-label="user menu" color="ghost" size="sm"><FaEllipsisVertical /></Button>}>
                            <TaskUpdate task={task} />
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
            </div>

            {isDragging ? <div className="border border-primary" style={{ height: node.current?.offsetHeight }} /> : null}
            <div
                className="transition-all"
                ref={setDropRef}
                style={{ height: (isOver && !isOverArciveTask && !isOverPreviousTask) ? activeHeight : '0px' }}
            />
        </>
    );
};

export default Task;


