import { TaskType } from '@/schemas';


export interface TasgDragData {
    task: TaskType;
    columnId: number;
    index: number;
}

export interface TaskDropData {
    task?: TaskType;
    columnId: number;
    index?: number;
}
