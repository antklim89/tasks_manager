import { TaskType } from '@/schemas';


export interface TaskProps {
    task: TaskType
    index: number
}

export interface TaskUpdateProps {
    task: TaskType
    className?: string
}

export interface TaskDeleteProps {
    task: TaskType
    className?: string
}
