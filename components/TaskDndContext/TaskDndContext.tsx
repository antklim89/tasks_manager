'use client';
import {
    pointerWithin,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { useSWRConfig } from 'swr';

import { columnUpdate, taskUpdate } from '@/request-hooks';
import { TaskType } from '@/schemas';
import { TaskDragData, TaskDropData } from '@/types';

import { TaskDndContextProps } from './TaskDndContext.types';


const TaskDndContext = ({ children }: TaskDndContextProps) => {
    const { mutate } = useSWRConfig();

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: { distance: 20 },
    });
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: { distance: 20 },
    });
    const keyboardSensor = useSensor(KeyboardSensor);
    const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

    const handleDrop = ({ active, over }: DragEndEvent) => {
        const activeData = active.data.current as TaskDragData | undefined;
        const overData = over?.data.current as TaskDropData | undefined;
        if (!overData || !activeData) return;
        if (overData.task?.id === activeData.task.id) return;

        if (overData.columnId === activeData.columnId) {

            mutate<TaskType[]>(['TASKS', { columnId: activeData.columnId }], (currentTasks) => {
                if (!currentTasks) return currentTasks;
                const newTasks = currentTasks.toSpliced(overData.index + 1, 0, activeData.task);

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
            const newTask: TaskType = { ...activeData.task, columnId: overData.columnId };
            const newTasks = currentTasks.toSpliced(overData.index + 1, 0, newTask);

            columnUpdate(overData.columnId, { taskOrder: newTasks.map((i) => i.id) });
            return newTasks;
        }, { revalidate: false });

        mutate<TaskType[]>(['TASKS', { columnId: activeData.columnId }], (currentTasks) => {
            if (!currentTasks) return currentTasks;
            const newTasks = currentTasks.filter((task) => task.id !== activeData.task.id);

            columnUpdate(activeData.columnId, { taskOrder: newTasks.map((i) => i.id) });
            return newTasks;
        }, { revalidate: false });
    };

    return (
        <DndContext
            collisionDetection={pointerWithin}
            sensors={sensors}
            onDragEnd={handleDrop}
        >
            {children}
        </DndContext>
    );
};

export default TaskDndContext;
