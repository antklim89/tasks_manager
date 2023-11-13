'use client';
import { ReactNode } from 'react';

import { ProjectContext } from '@/hooks';
import { useProjectFetch } from '@/request-hooks';
import { ProjectType } from '@/schemas';


const ProjectProvider = ({
    children,
    defaultProject,
}: {
    children: ReactNode,
    defaultProject: ProjectType,
}) => {
    const { data: project = defaultProject } = useProjectFetch({ project: defaultProject });
    
    return (
        <ProjectContext.Provider value={project}>{children}</ProjectContext.Provider>
    );
};

export default ProjectProvider;
