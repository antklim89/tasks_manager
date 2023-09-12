'use client';
import { useEffect } from 'react';
import { FaEllipsisVertical } from 'react-icons/fa6';

import { Menu } from '@/components';
import Task from '@/features/Task';
import { useTaskDrop } from '@/hooks';
import { useColumnUpdate, useTasksFetch } from '@/requests';
import { ColumnType } from '@/schemas';

import ColumnDelete from './ColumnDelete';
import ColumnName from './ColumnName';
import ColumnTaskCreate from './ColumnTaskCreate';


const Column = ({ id, name, project }: ColumnType) => {
    const { data: tasks = [], isLoading } = useTasksFetch({ columnId: id });
    const { trigger: updateColumn } = useColumnUpdate({ projectId: project, columnId: id });

    const {
        setNodeRef: setDropRef,
        isOver,
        isFirstTask,
        activeHeight,
    } = useTaskDrop(id);

    useEffect(() => {
        updateColumn({
            taskOrder: tasks.map((i) => i.id),
        });
    }, [tasks.map((i) => i.id).join('')]);

    //     const x = tasks.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));

    return (
        <div
            className="card w-96 bg-base-200 shadow-xl"
        >
            <div className="card-title flex justify-between" ref={setDropRef}>
                <ColumnName id={id} name={name} projectId={project} />
                <Menu button={<button className="btn m-1" type="button"><FaEllipsisVertical /></button>}>
                    <ColumnDelete id={id} projectId={project} />
                </Menu>
            </div>

            <div className="flex flex-col p-1 relative">
                <div className="transition-all" style={{ height: (isOver && !isFirstTask) ? activeHeight : '5px' }} />
                {isLoading ? <span className="loading loading-bars loading-lg" /> : null}
                {tasks.map((task, index) => (
                    <Task index={index} key={task.id} task={task} />
                ))}
            </div>

            <div className="card-actions p-1 flex justify-end">
                <ColumnTaskCreate columnId={id} />
            </div>
        </div>
    );
};

export default Column;

