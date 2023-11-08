'use client';
import { FaEllipsisVertical } from 'react-icons/fa6';
import { createContext } from 'use-context-selector';

import { Menu } from '@/components';
import TaskDrop from '@/components/TaskDrop';
import Task from '@/features/Task';
import { useMember } from '@/hooks';
import { useTasksFetch } from '@/request-hooks';
import { ColumnType, TaskType } from '@/schemas';

import ColumnDelete from './ColumnDelete';
import ColumnName from './ColumnName';
import ColumnTaskCreate from './ColumnTaskCreate';


export const ColumnContext = createContext<ColumnType|null>(null);

const Column = ({ column, defaultTasks }: { column: ColumnType, defaultTasks?: TaskType[] }) => {
    const { data: tasks = [], isLoading } = useTasksFetch({
        columnId: column.id,
        taskOrder: column.taskOrder,
    }, { defaultValue: defaultTasks });
    const { isAdmin, isAdminOrUser: isAdminOrMember } = useMember();

    return (
        <ColumnContext.Provider value={column}>
            <div
                className="card w-96 bg-base-200 shadow-xl"
            >
                <div className="flex items-start">
                    <ColumnName id={column.id} name={column.name} />
                    {isAdminOrMember ? <ColumnTaskCreate column={column} /> : null}
                    {isAdmin
                        ? (
                            <Menu button={<button className="btn" type="button"><FaEllipsisVertical /></button>}>
                                <ColumnDelete id={column.id} />
                            </Menu>
                        )
                        : null}
                </div>

                <div className="flex flex-col p-1 relative">
                    <TaskDrop index={-1} />
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
        </ColumnContext.Provider>
    );
};

export default Column;

