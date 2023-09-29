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
import { columnUpdate, taskUpdate, useColumnCreate, useColumnsFetch } from '@/requests';
import { TaskType } from '@/schemas';
import { TasgDragData, TaskDropData } from '@/types';


const Project = () => {
    const { trigger: createColumn, isMutating } = useColumnCreate();
    const { data: columns = [], isLoading } = useColumnsFetch();
    const { mutate } = useSWRConfig();

    const handleCreateColumn = () => {
        createColumn();
    };

    const mouseSensor = useSensor(MouseSensor);
    const touchSensor = useSensor(TouchSensor);
    const keyboardSensor = useSensor(KeyboardSensor);
    const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

    const handleDrop = ({ active, over }: DragEndEvent) => {
        const activeData = active.data.current as TasgDragData | undefined;
        const overData = over?.data.current as TaskDropData | undefined;
        if (!overData || !activeData) return;
        if (overData.task?.id === activeData.task.id) return;

        if (overData.columnId === activeData.columnId) {

            mutate<TaskType[]>(['TASKS', { columnId: activeData.columnId }], (currentTasks) => {
                if (!currentTasks) return currentTasks;
                const newTasks = currentTasks.toSpliced((overData.index ?? -1) + 1, 0, activeData.task);

                if ((overData.index || -1) < activeData.index) newTasks.splice(activeData.index + 1, 1);
                else newTasks.splice(activeData.index, 1);

                columnUpdate(overData.columnId, { taskOrder: newTasks.map((i) => i.id) });
                return newTasks;
            }, { revalidate: false });

            return;
        }

        taskUpdate(activeData.task.id, { columnId: overData.columnId });

        mutate<TaskType[]>(['TASKS', { columnId: overData.columnId }], (currentTasks) => {
            if (!currentTasks) return currentTasks;
            const newTask = { ...activeData.task, columnId: overData.columnId };
            const newTasks = currentTasks.toSpliced((overData.index ?? -1) + 1, 0, newTask);

            columnUpdate(overData.columnId, { taskOrder: newTasks.map((i) => i.id) });
            return newTasks;
        }, { revalidate: false });

        mutate<TaskType[]>(['TASKS', { columnId: activeData.columnId }], (currentTasks) => {
            const newTasks = currentTasks?.filter((task) => task.id !== activeData.task.id);

            if (newTasks) columnUpdate(activeData.columnId, { taskOrder: newTasks.map((i) => i.id) });
            return newTasks;
        }, { revalidate: false });
    };

    if (isLoading) return <span className="loading loading-bars loading-lg" />;
    return (
        <DndContext
            collisionDetection={pointerWithin}
            sensors={sensors}
            onDragEnd={handleDrop}
        >
            <div className="h-0 flex flex-grow items-start gap-2 overflow-x-scroll overflow-y-scroll">
                {columns.map((column) => (
                    <Column key={column.id} {...column} />
                ))}
                <Button isLoading={isMutating} onClick={handleCreateColumn}>Create new column</Button>
            </div>
        </DndContext>
    );
};

export default Project;
