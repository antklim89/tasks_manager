'use client';
import { TaskDndContext } from '@/components';
import Column from '@/features/Column';
import { ColumnContext } from '@/hooks';
import { useColumnsFetch } from '@/request-hooks';

import { ProjectProps } from './Project.type';
import ProjectCreateColumn from './ProjectCreateColumn';


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
