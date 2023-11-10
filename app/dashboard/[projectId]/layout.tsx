import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { z } from 'zod';

import { ProjectProvider } from '@/components';
// import { ProjectContext } from '@/hooks';
import { memberFetch, projectFetch } from '@/requests';


const ProjectLayout = async ({ children, params }: { children: ReactNode, params: { projectId?: string[] } }) => {
    const projectId = await z.coerce.number().parseAsync(params?.projectId);
    // const member = await memberFetch({ projectId });
    const project = await projectFetch({ projectId });
    return <ProjectProvider defaultProject={project} projectId={projectId}>{children}</ProjectProvider>;
};

export default ProjectLayout;
