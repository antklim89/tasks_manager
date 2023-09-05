import { TaskType } from '@/schemas';


export interface TasgDragData {
    task: TaskType;
    columnId: number;
    index: number;
    updateTask: (arg: {
        columnId: number;
    }) => void;
}

export interface TaskDropData {
    task?: TaskType;
    columnId: number;
    index?: number;
}
