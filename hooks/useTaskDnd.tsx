import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { CSSProperties } from 'react';

import { TaskType } from '@/schemas';
import { TasgDragData } from '@/types';


export function useTaskDnd({ task, index }: { task: TaskType; index: number;}) {
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
        data: { task, columnId: task.columnId, index },
    });

    const {
        setNodeRef: setDropRef,
        isOver,
    } = useDroppable({
        id: task.id,
        data: { task, columnId: task.columnId, index },
    });

    const activeData = active && active.data.current as TasgDragData;
    const overData = over && over.data.current as TasgDragData;

    const isOverArciveTask = active?.id === over?.id;
    const isOverPreviousTask = Boolean(activeData
        && overData
        && activeData.columnId === overData.columnId
        && (overData.index + 1 === activeData.index));

    const style: CSSProperties = {
        position: isDragging ? 'absolute' : 'static',
        top: node.current?.offsetTop,
        zIndex: isDragging ? 10 : undefined,
        opacity: isDragging ? 0.8 : undefined,
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
