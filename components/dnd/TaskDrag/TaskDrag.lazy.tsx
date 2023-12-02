'use client';
import { lazy, Suspense } from 'react';

import { TaskDragProps } from './TaskDrag.types';


const TaskDrag = lazy(() => import('./TaskDrag'));

const TaskDragLazy = (props: TaskDragProps) => {
    return (
        <Suspense fallback={<div {...props} />}>
            <TaskDrag {...props} />
        </Suspense>
    );
};

export default TaskDragLazy;
