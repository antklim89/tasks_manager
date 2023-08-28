'use client';
import { FaEllipsisVertical } from 'react-icons/fa6';

import { Button, DateComponent, Menu } from '@/components';

import { TaskProps } from './Task.types';
import TaskDelete from './TaskDelete';


const Task = ({ task }: TaskProps) => {

    return (
        <div className="card bg-primary shadow-lg">
            <div className="card-body p-2">
                <div className="card-title flex justify-between">
                    {task.title}
                    <Menu button={<Button aria-label="user menu" color="ghost" size="sm"><FaEllipsisVertical /></Button>}>
                        <Menu.Item>
                            <TaskDelete columnId={task.columnId} id={task.id} />
                        </Menu.Item>
                    </Menu>
                </div>
                <div className="card-body p-1">
                    {task.description}
                </div>
                <div className="card-actions">
                    <DateComponent date={task.completeAt} />
                </div>
            </div>
        </div>
    );
};

export default Task;
