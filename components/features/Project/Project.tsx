'use client';
import { Column, TaskDndContext } from '@/components';
import { ColumnContext } from '@/hooks';
import { useColumnsFetch } from '@/request-hooks';

import ProjectCreateColumn from './ProjectCreateColumn';


const Project = () => {
    const { data: columns = [] } = useColumnsFetch();

    return (
        <TaskDndContext>
            <div className="flex flex-grow items-start gap-2 overflow-scroll">
                {columns.map((column) => (
                    <ColumnContext.Provider key={column.id} value={column}>
                        <Column />
                    </ColumnContext.Provider>
                ))}
                <ProjectCreateColumn />
            </div>
        </TaskDndContext>
    );
};

export default Project;
