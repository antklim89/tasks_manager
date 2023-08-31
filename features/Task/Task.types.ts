import { TaskUpdateType } from '@/requests';
import { TaskType } from '@/schemas';


export interface TaskProps {
    task: TaskType
}

export interface TaskDragItem {
    task: TaskType
    updateTask: (arg: TaskUpdateType) => void
}
