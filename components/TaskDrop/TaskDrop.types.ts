import { TaskType } from '@/schemas';


export interface TaskDropProps {
    index: number;
    task?: TaskType;
    columnId: number;
}
