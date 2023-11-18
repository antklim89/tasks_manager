import { createContext, useContext } from 'use-context-selector';

import type { ColumnType, HistoryType, MemberType, TaskType } from '@/schemas';


export type ProjectDefaultsContextType = {
    defaultColumns?: ColumnType[],
    defaultTasks?: Record<number, TaskType[]>
    defaultHistory?: HistoryType[]
    defaultMembers?: MemberType[]
    historyStartDate?: string
}

export const ProjectDefaultsContext = createContext<ProjectDefaultsContextType | undefined>(undefined);

export function useProjectDefaults(): ProjectDefaultsContextType {
    const projectContext = useContext(ProjectDefaultsContext);
    if (!projectContext) {
        throw new Error('The useProjectDefaults is not in the Project provider.');
    }
    return projectContext;
}
