import { useContext } from 'react';

import { ProjectIdContext } from '@/components/ProjectIdProvider/ProjectIdProvider';


export function useProjectId(): number {
    const projectId = useContext(ProjectIdContext);
    if (!projectId) throw new Error('You are not on the project page');
    return projectId;
}
