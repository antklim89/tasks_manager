import { ColumnType, TaskType } from '@/schemas';


export interface ProjectProps {
    defaultColumns: ColumnType[],
    defaultTasks: Record<number, TaskType[]>
}
