'use client';
import { createContext } from 'use-context-selector';

import { TaskDndContext } from '@/components';
import Column from '@/features/Column';
import { useColumnsFetch } from '@/request-hooks';
import { ColumnType } from '@/schemas';

import { ProjectProps } from './Project.type';
import ProjectCreateColumn from './ProjectCreateColumn';


export const ColumnContext = createContext<ColumnType|null>(null);

const Project = ({ defaultColumns, defaultTasks }: ProjectProps) => {
    const { data: columns = [], isLoading } = useColumnsFetch({ defaultValue: defaultColumns });

    if (isLoading) return <span className="loading loading-bars loading-lg" />;
    return (
        <TaskDndContext>
            <div className="h-0 flex flex-grow items-start gap-2 overflow-x-scroll overflow-y-scroll">
                {columns.map((column) => (
                    <ColumnContext.Provider key={column.id} value={column}>
                        <Column defaultTasks={defaultTasks?.[column.id]} />
                    </ColumnContext.Provider>
                ))}
                <ProjectCreateColumn />
            </div>
        </TaskDndContext>
    );
};

export default Project;
