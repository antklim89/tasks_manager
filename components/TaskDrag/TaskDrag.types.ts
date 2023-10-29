import { HTMLAttributes, ReactNode } from 'react';

import { TaskType } from '@/schemas';


export interface TaskDragProps extends HTMLAttributes<HTMLDivElement> {
    task: TaskType;
    index: number;
    children: ReactNode
}
