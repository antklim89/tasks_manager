import type { ColumnType, TaskType } from '@/schemas';


export interface TaskDragData {
    task: TaskType;
    column: ColumnType
    index: number;
    type: 'TASK'
}

export interface TaskDropData {
    task?: TaskType;
    column: ColumnType
    index: number;
    type: 'TASK'
}
