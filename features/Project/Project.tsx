'use client';
import { DndContext, pointerWithin } from '@dnd-kit/core';

import { Button } from '@/components';
import Column from '@/features/Column';
import { useMember } from '@/hooks';
import { useColumnCreate, useColumnsFetch } from '@/request-hooks';

import { ProjectProps } from './Project.type';
import { useProject } from './Project.use';


const Project = ({ defaultColumns, defaultTasks }: ProjectProps) => {
    const { trigger: createColumn, isMutating } = useColumnCreate();
    const { data: columns = [], isLoading } = useColumnsFetch({ defaultValue: defaultColumns });
    const { isAdmin } = useMember();
    const { sensors, handleDrop } = useProject();

    if (isLoading) return <span className="loading loading-bars loading-lg" />;
    return (
        <DndContext
            collisionDetection={pointerWithin}
            sensors={sensors}
            onDragEnd={handleDrop}
        >
            <div className="h-0 flex flex-grow items-start gap-2 overflow-x-scroll overflow-y-scroll">
                {columns.map((column) => (
                    <Column
                        column={column}
                        defaultTasks={defaultTasks?.[column.id]}
                        key={column.id}
                    />
                ))}
                {isAdmin
                    ? <Button isLoading={isMutating} onClick={() => createColumn()}>Create new column</Button>
                    : null}
            </div>
        </DndContext>
    );
};

export default Project;
