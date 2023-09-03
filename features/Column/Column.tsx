'use client';
// import { useDroppable } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { FaEllipsisVertical } from 'react-icons/fa6';

import { Menu } from '@/components';
import Task from '@/features/Task';
import { useTasksFetch } from '@/requests';
import { ColumnType } from '@/schemas';
import { cn } from '@/utils';

import ColumnDelete from './ColumnDelete';
import ColumnName from './ColumnName';
import ColumnTaskCreate from './ColumnTaskCreate';


const Column = ({ id, name, project }: ColumnType) => {
    const { data: tasks = [], isLoading } = useTasksFetch({ columnId: id });
    // const { setNodeRef } = useDroppable({ id });

    return (
        <div
            className="card w-96 bg-base-200 shadow-xl"
        >
            <div className="card-title flex justify-between">
                <ColumnName id={id} name={name} projectId={project} />
                <Menu button={<button className="btn m-1" type="button"><FaEllipsisVertical /></button>}>
                    <Menu.Item>
                        <ColumnDelete id={id} projectId={project} />
                    </Menu.Item>
                </Menu>
            </div>
            <div className={cn('transition-all h-0')} />

            <SortableContext items={tasks.map((i) => i.id)}>
                <div className="flex flex-col p-1 relative">
                    {isLoading ? <span className="loading loading-bars loading-lg" /> : null}
                    {tasks.map((task, index) => (
                        <Task index={index} key={task.id} task={task} />
                    ))}
                </div>
            </SortableContext>

            <div className="card-actions p-1 flex justify-end">
                <ColumnTaskCreate columnId={id} />
            </div>
        </div>
    );
};

export default Column;
