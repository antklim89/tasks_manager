'use client';
import { ReactNode } from 'react';

import { ProjectContext } from '@/hooks';
import { useProjectFetch } from '@/request-hooks';
import { ProjectType } from '@/schemas';


const ProjectProvider = ({
    children,
    defaultProject,
    projectId,
}: {
    children: ReactNode,
    defaultProject?: ProjectType,
    projectId: number,
}) => {
    // const { data: project } = useProjectFetch({ projectId }, { defaultValue: defaultProject });
    
    return (
        <ProjectContext.Provider value={defaultProject}>{children}</ProjectContext.Provider>
    );
};

export default ProjectProvider;
