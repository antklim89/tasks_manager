'use client';

import {
    DndContext, DragEndEvent,
    KeyboardSensor,
    MouseSensor, TouchSensor,
    pointerWithin,
    useSensor,
    useSensors,
} from '@dnd-kit/core';

import { Button } from '@/components';
import Column from '@/features/Column';
import { useColumnCreate, useColumnsFetch } from '@/requests';


const Project = ({ projectId }: {projectId: number}) => {
    const { trigger: createColumn, isMutating } = useColumnCreate({ projectId });
    const { data: columns = [], isLoading } = useColumnsFetch({ projectId });

    const handleCreateColumn = () => {
        createColumn();
    };

    const mouseSensor = useSensor(MouseSensor);
    const touchSensor = useSensor(TouchSensor);
    const keyboardSensor = useSensor(KeyboardSensor);
    const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

    const handleDrop = (e: DragEndEvent) => {
        console.log('== : e', e);
    };


    if (isLoading) return <span className="loading loading-bars loading-lg" />;
    return (
        <DndContext collisionDetection={pointerWithin} sensors={sensors} onDragEnd={handleDrop} >
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
