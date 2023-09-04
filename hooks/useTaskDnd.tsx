import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { CSSProperties } from 'react';

import { TaskType } from '@/schemas';
import { TasgDragData, TaskDropData } from '@/types';


export function useTaskDnd({
    task,
    index,
    updateTask,
}: {
    task: TaskType;
    index: number;
    updateTask: (arg: { columnId: number; }) => void;
}) {
    const dragData = { task, columnId: task.columnId, index, updateTask } satisfies TasgDragData;
    const dropData = { task, columnId: task.columnId, index } satisfies TaskDropData;

    const {
        attributes,
        listeners,
        setNodeRef: setDragRef,
        transform,
        isDragging,
        active,
        over,
        node,
        activeNodeRect,
    } = useDraggable({
        id: task.id,
        data: dragData,
    });

    const {
        setNodeRef: setDropRef, isOver,
    } = useDroppable({
        id: task.id,
        data: dropData,
    });

    const activeData = active && active.data.current as typeof dragData;
    const overData = over && over.data.current as typeof dragData;

    const isOverArciveTask = active?.id === over?.id;
    const isOverPreviousTask = Boolean(activeData
        && overData
        && activeData.columnId === overData.columnId
        && (overData.index + 1 === activeData.index));

    const style: CSSProperties = {
        position: isDragging ? 'absolute' : 'static',
        top: node.current?.offsetTop,
        zIndex: isDragging ? 10 : 0,
        scale: isDragging ? 1.02 : 1,
        opacity: isDragging ? 0.5 : 1,
        transform: CSS.Translate.toString(transform),
    };

    const activeHeight = activeNodeRect?.height;

    return {
        activeData,
        overData,
        isOverArciveTask,
        isOverPreviousTask,
        attributes,
        listeners,
        setDragRef,
        setDropRef,
        isOver,
        isDragging,
        style,
        node,
        activeHeight,
    };
}
