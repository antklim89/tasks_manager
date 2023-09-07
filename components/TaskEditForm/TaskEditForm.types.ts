import { ReactNode } from 'react';

import { TaskCreateType } from '@/schemas';


export interface TaskEditFormProps {
    children: ReactNode
    onSubmit?: (data: TaskCreateType) => unknown | Promise<unknown>
    defaultValues?: TaskCreateType
}
