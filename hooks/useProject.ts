import { useContext } from 'react';

import { ProjectContext } from '@/components/ProjectProvider/ProjectProvider';
import type { MemberType } from '@/schemas';


interface ProjectContext {
    projectId: number;
    member: MemberType;
}

export function useProject(isRequired?: true): ProjectContext
export function useProject(isRequired: false): ProjectContext | {projectId: null, member: null}

export function useProject(isRequired = true): ProjectContext | {projectId: null, member: null} {
    const projectContext = useContext(ProjectContext);
    if (!projectContext) {
        if (isRequired) throw new Error('You are not on the project page');
        else return { member: null, projectId: null };
    }
    return projectContext;
}
