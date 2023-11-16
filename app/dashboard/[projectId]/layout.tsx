import { ReactNode } from 'react';
import { z } from 'zod';

import { ProjectValuesProvider } from '@/components';
import { memberFetch, projectFetch, projectsFetch } from '@/requests';


const ProjectLayout = async ({ children, params }: { children: ReactNode, params: { projectId?: string[] } }) => {
    const projectId = await z.coerce.number().parseAsync(params?.projectId);
    const member = await memberFetch({ projectId });
    const project = await projectFetch({ projectId });
    const projects = await projectsFetch();

    return (
        <ProjectValuesProvider defaultMember={member} defaultProject={project} defaultProjects={projects}>
            {children}
        </ProjectValuesProvider>
    );
};

export default ProjectLayout;
