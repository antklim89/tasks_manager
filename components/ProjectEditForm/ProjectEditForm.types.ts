import { ReactNode } from 'react';

import { ProjectUpdateType } from '@/schemas';


export interface ProjectEditFormProps {
    children: ReactNode
    onSubmit?: (data: ProjectUpdateType) => unknown | Promise<unknown>
    defaultValues?: ProjectUpdateType
}
