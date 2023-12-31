'use client';
import { FaEllipsisVertical } from 'react-icons/fa6';

import { Menu, Task, TaskDrop } from '@/components';
import { TaskContext, useMember } from '@/hooks';
import { useTasksFetch } from '@/request-hooks';

import ColumnDelete from './ColumnDelete';
import ColumnName from './ColumnName';
import ColumnTaskCreate from './ColumnTaskCreate';


const Column = () => {
    const { data: tasks = [] } = useTasksFetch();
    const { isAdmin, isAdminOrUser: isAdminOrMember } = useMember();

    return (
        <div className="flex flex-col flex-shrink-0 w-80 bg-base-200 shadow-xl">
            <div className="flex items-start">
                <ColumnName />
                {isAdminOrMember ? <ColumnTaskCreate /> : null}
                {isAdmin
                    ? (
                        <Menu button={<button className="btn" type="button"><FaEllipsisVertical /></button>}>
                            <ColumnDelete />
                        </Menu>
                    )
                    : null}
            </div>

            <div className="flex flex-col p-1 relative">
                <TaskDrop index={-1} />
                {tasks.map((task, index) => (
                    <TaskContext.Provider key={task.id} value={task}>
                        <Task index={index} />
                    </TaskContext.Provider>
                ))}
            </div>
        </div>
    );
};

export default Column;

