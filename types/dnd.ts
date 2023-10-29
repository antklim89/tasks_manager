import { TaskType } from '@/schemas';


export interface TaskDragData {
    task: TaskType;
    columnId: number;
    index: number;
    type: 'TASK'
}

export interface TaskDropData {
    task?: TaskType;
    columnId: number;
    index: number;
    type: 'TASK'
}
