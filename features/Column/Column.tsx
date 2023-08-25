'use client';
import { FaEllipsisVertical } from 'react-icons/fa6';

import { Menu } from '@/components';
import Task from '@/features/Task';
import { useTasksFetch } from '@/requests';
import { ColumnType } from '@/schemas';

import ColumnDelete from './ColumnDelete';
import ColumnName from './ColumnName';
import ColumnTaskCreate from './ColumnTaskCreate';


const Column = ({ id, name, project }: ColumnType) => {
    const { data: tasks = [], isLoading } = useTasksFetch({ columnId: id });

    return (
        <div className="card w-96 bg-base-200 shadow-xl">
            <div className="card-body p-1">
                <div className="card-title flex justify-between">
                    <ColumnName id={id} name={name} projectId={project} />
                    <Menu button={<button className="btn m-1" type="button"><FaEllipsisVertical /></button>}>
                        <Menu.Item>
                            <ColumnDelete id={id} projectId={project} />
                        </Menu.Item>
                    </Menu>
                </div>
                <div className="card-body p-1">
                    {isLoading ? <span className="loading loading-bars loading-lg" /> : null}
                    {tasks.map((task) => (
                        <Task key={task.id} task={task} />
                    ))}
                </div>
                <div className="card-actions p-1 flex justify-end">
                    <ColumnTaskCreate columnId={id} />
                </div>
            </div>
        </div>
    );
};

export default Column;
