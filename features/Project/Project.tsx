'use client';

import {
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    MouseSensor, TouchSensor,
    pointerWithin,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { useSWRConfig } from 'swr';

import { Button } from '@/components';
import Column from '@/features/Column';
import { useColumnCreate, useColumnsFetch } from '@/requests';
import { TaskType } from '@/schemas';


const Project = ({ projectId }: {projectId: number}) => {
    const { trigger: createColumn, isMutating } = useColumnCreate({ projectId });
    const { data: columns = [], isLoading } = useColumnsFetch({ projectId });
    const { mutate } = useSWRConfig();

    const handleCreateColumn = () => {
        createColumn();
    };

    const mouseSensor = useSensor(MouseSensor);
    const touchSensor = useSensor(TouchSensor);
    const keyboardSensor = useSensor(KeyboardSensor);
    const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

    const handleDrop = ({ active, over }: DragEndEvent) => {
        const activeTask: TaskType | undefined = active.data.current?.task;
        const overTask: TaskType | undefined = over?.data.current?.task;
        if (!overTask || !activeTask) return;
        if (overTask.id === activeTask.id) return;

        active.data.current?.updateTask({ columnId: overTask.columnId });

        if (overTask.columnId === activeTask.columnId) return;
        mutate<TaskType[]>(['TASKS', { columnId: overTask.columnId }], (currentTasks) => {
            return [{ ...activeTask, columnId: overTask.columnId }, ...(currentTasks || [])];
        }, { revalidate: false });
    };

    if (isLoading) return <span className="loading loading-bars loading-lg" />;
    return (
        <DndContext
            collisionDetection={pointerWithin}
            sensors={sensors}
            onDragEnd={handleDrop}
        >
            <div className="flex flex-grow items-start gap-2 overflow-x-scroll overflow-y-hidden">
                {columns.map((column) => (
                    <Column key={column.id} {...column} />
                ))}
                <Button isLoading={isMutating} onClick={handleCreateColumn}>Create new column</Button>
            </div>
        </DndContext>
    );
};

export default Project;
