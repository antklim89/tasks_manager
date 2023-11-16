'use client';
import { TaskDndContext } from '@/components';
import Column from '@/features/Column';
import { ColumnContext } from '@/hooks';
import { useColumnsFetch } from '@/request-hooks';

import { ProjectProps } from './Project.type';
import ProjectCreateColumn from './ProjectCreateColumn';


const Project = ({ defaultColumns, defaultTasks }: ProjectProps) => {
    const { data: columns = [], isLoading } = useColumnsFetch({ defaultValue: defaultColumns });

    return (
        <TaskDndContext>
            <div className="h-0 flex flex-grow items-start gap-2 overflow-x-scroll overflow-y-scroll">
                {isLoading
                    ? Array.from({ length: defaultColumns?.length || 0 }, (_, i) => i).map((i) => (
                        <div className="skeleton h-[500px] w-96" key={i} />
                    ))
                    : null}
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
