import { useContext } from 'react';

import { ProjectIdContext } from '@/components/ProjectIdProvider/ProjectIdProvider';


export function useProjectId(isRequired?: true): number
export function useProjectId(isRequired: false): number | null

export function useProjectId(isRequired = true): number | null {
    const projectId = useContext(ProjectIdContext);
    if (!projectId) {
        if (isRequired) throw new Error('You are not on the project page');
        else return null;
    }
    return projectId;
}
