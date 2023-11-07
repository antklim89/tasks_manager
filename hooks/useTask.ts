import { useContext } from 'react';

import { TaskContext } from '@/features/Task/Task';
import type { TaskType } from '@/schemas';


export function useTask(): TaskType {
    const taskContext = useContext(TaskContext);
    if (!taskContext) {
        throw new Error('The useTask is not in the Task provider.');
    }
    return taskContext;
}
