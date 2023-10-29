'use client';
import { lazy, Suspense } from 'react';

import { TaskDndContextProps } from './TaskDndContext.types';


const TaskDndContext = lazy(() => import('./TaskDndContext'));

const TaskDndContextLazy = (props: TaskDndContextProps) => {
    return (
        <Suspense fallback={props.children}>
            <TaskDndContext {...props} />
        </Suspense>
    );
};

export default TaskDndContextLazy;
