import { createContext, useContext, useContextSelector } from 'use-context-selector';

import type { ProjectType } from '@/schemas';


export const ProjectContext = createContext<ProjectType | undefined>(undefined);


export function useProject(isRequired?: true): ProjectType
export function useProject(isRequired: false): ProjectType | undefined

export function useProject(isRequired = true): ProjectType | undefined {
    const projectContext = useContext(ProjectContext);
    if (!projectContext) {
        if (isRequired) throw new Error('The useProject is not in the Project provider.');
        else return undefined;
    }
    return projectContext;
}

export function useProjectSelector<S>(selector: (value: ProjectType) => S, isRequired?: true): S
export function useProjectSelector<S>(selector: (value: ProjectType) => S, isRequired: false): S | undefined

export function useProjectSelector<S>(selector: (value: ProjectType) => S, isRequired = true): S | undefined {
    const taskContext = useContextSelector<ProjectType|undefined, S|undefined>(ProjectContext, (value) => {
        if (!value) {
            if (isRequired) throw new Error('The useProject is not in the Project provider.');
            else return undefined;
        }
        return selector(value);
    });
    return taskContext;
}
