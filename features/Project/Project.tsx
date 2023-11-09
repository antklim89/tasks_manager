'use client';
import { createContext } from 'use-context-selector';

import { Button, TaskDndContext } from '@/components';
import Column from '@/features/Column';
import { useMember } from '@/hooks';
import { useColumnCreate, useColumnsFetch, useHistoryCreate } from '@/request-hooks';
import { ColumnType } from '@/schemas';

import { ProjectProps } from './Project.type';


export const ColumnContext = createContext<ColumnType|null>(null);

const Project = ({ defaultColumns, defaultTasks }: ProjectProps) => {
    const { trigger: historyCreate } = useHistoryCreate();
    const { trigger: createColumn, isMutating } = useColumnCreate({
        onSuccess() {
            historyCreate({ body: 'New column created' });
        },
    });
    const { data: columns = [], isLoading } = useColumnsFetch({ defaultValue: defaultColumns });
    const { isAdmin } = useMember();

    if (isLoading) return <span className="loading loading-bars loading-lg" />;
    return (
        <TaskDndContext>
            <div className="h-0 flex flex-grow items-start gap-2 overflow-x-scroll overflow-y-scroll">
                {columns.map((column) => (
                    <ColumnContext.Provider key={column.id} value={column}>
                        <Column defaultTasks={defaultTasks?.[column.id]} />
                    </ColumnContext.Provider>
                ))}
                {isAdmin
                    ? <Button isLoading={isMutating} onClick={() => createColumn()}>Create new column</Button>
                    : null}
            </div>
        </TaskDndContext>
    );
};

export default Project;
