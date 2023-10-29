'use client';
import { lazy, Suspense } from 'react';

import { TaskDropProps } from './TaskDrop.types';


const TaskDrop = lazy(() => import('./TaskDrop'));

const TaskDropLazy = (props: TaskDropProps) => {
    return (
        <Suspense>
            <TaskDrop {...props} />
        </Suspense>
    );
};

export default TaskDropLazy;
