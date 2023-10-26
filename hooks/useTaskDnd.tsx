import { useDraggable } from '@dnd-kit/core';
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
        over,
        node,
    } = useDraggable({
        id: task.id,
        data: { task, columnId: task.columnId, index },
    });

    const overData = over && over.data.current as TasgDragData;

    const style: CSSProperties = {
        position: isDragging ? 'absolute' : 'static',
        top: node.current?.offsetTop,
        zIndex: isDragging ? 10 : undefined,
        opacity: isDragging ? 0.8 : undefined,
        transform: CSS.Translate.toString(transform),
    };

    return {
        overData,
        attributes,
        listeners,
        setDragRef,
        isDragging,
        style,
        node,
    };
}
