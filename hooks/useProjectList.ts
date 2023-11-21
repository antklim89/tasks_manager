import { createContext, useContext } from 'use-context-selector';

import type { ProjectType } from '@/schemas';


export const ProjectListContext = createContext<ProjectType[] | undefined>(undefined);


export function useProjectList(isRequired?: true): ProjectType[]
export function useProjectList(isRequired: false): ProjectType[] | undefined

export function useProjectList(isRequired = true): ProjectType[] | undefined {
    const projectContext = useContext(ProjectListContext);
    if (!projectContext) {
        if (isRequired) throw new Error('The useProjectList is not in the Project provider.');
        else return undefined;
    }
    return projectContext;
}
