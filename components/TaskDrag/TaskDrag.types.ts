import { HTMLAttributes, ReactNode } from 'react';


export interface TaskDragProps extends HTMLAttributes<HTMLDivElement> {
    index: number;
    children: ReactNode
}
