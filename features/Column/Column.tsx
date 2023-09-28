'use client';
import { FaEllipsisVertical } from 'react-icons/fa6';

import { Menu } from '@/components';
import Task from '@/features/Task';
import { useTaskDrop } from '@/hooks';
import { useTasksFetch } from '@/requests';
import { ColumnType } from '@/schemas';

import ColumnDelete from './ColumnDelete';
import ColumnName from './ColumnName';
import ColumnTaskCreate from './ColumnTaskCreate';


const Column = ({ id, name, projectId, taskOrder }: ColumnType) => {
    const { data: tasks = [], isLoading } = useTasksFetch({ columnId: id, taskOrder });

    const {
        setNodeRef: setDropRef,
        isOver,
        isFirstTask,
        activeHeight,
    } = useTaskDrop(id);

    return (
        <div
            className="card w-96 bg-base-200 shadow-xl"
        >
            <div className="flex items-start" ref={setDropRef}>
                <ColumnName id={id} name={name} projectId={projectId} />
                <ColumnTaskCreate columnId={id} projectId={projectId} />
                <Menu button={<button className="btn" type="button"><FaEllipsisVertical /></button>}>
                    <ColumnDelete id={id} projectId={projectId} />
                </Menu>
            </div>

            <div className="flex flex-col p-1 relative">
                <div className="transition-all" style={{ height: (isOver && !isFirstTask) ? activeHeight : '5px' }} />
                {isLoading ? <span className="loading loading-bars loading-lg" /> : null}
                {tasks.map((task, index) => (
                    <Task
                        index={index}
                        key={task.id}
                        task={task}
                    />
                ))}
            </div>
        </div>
    );
};

export default Column;

