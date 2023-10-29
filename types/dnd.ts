import { TaskType } from '@/schemas';


export interface TaskDragData {
    task: TaskType;
    columnId: number;
    index: number;
}

export interface TaskDropData {
    task?: TaskType;
    columnId: number;
    index?: number;
}
