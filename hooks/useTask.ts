import { useContext, useContextSelector } from 'use-context-selector';

import { TaskContext } from '@/features/Task/Task';
import type { TaskType } from '@/schemas';


export function useTask(): TaskType {
    const taskContext = useContext(TaskContext);
    if (!taskContext) {
        throw new Error('The useTask is not in the Task provider.');
    }
    return taskContext;
}

export function useTaskSelector<Selected>(selector: (value: TaskType) => Selected): Selected {
    const taskContext = useContextSelector<TaskType | null, Selected>(TaskContext, (value) => {
        if (!value) {
            throw new Error('The useTask is not in the Task provider.');
        }
        return selector(value);
    });
    return taskContext;
}
