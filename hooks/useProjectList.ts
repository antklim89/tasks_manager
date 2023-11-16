import { createContext, useContext } from 'use-context-selector';

import type { ProjectListType } from '@/schemas';


export const ProjectListContext = createContext<ProjectListType | undefined>(undefined);


export function useProjectList(isRequired?: true): ProjectListType
export function useProjectList(isRequired: false): ProjectListType | undefined

export function useProjectList(isRequired = true): ProjectListType | undefined {
    const projectContext = useContext(ProjectListContext);
    if (!projectContext) {
        if (isRequired) throw new Error('The useProjectList is not in the Project provider.');
        else return undefined;
    }
    return projectContext;
}
