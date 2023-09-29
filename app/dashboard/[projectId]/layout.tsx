import { ReactNode } from 'react';
import { z } from 'zod';

import { ProjectIdProvider } from '@/components';


const ProjectLayout = async ({ children, params }: { children: ReactNode, params: { projectId?: string[] } }) => {
    const projectId = await z.coerce.number().parseAsync(params?.projectId);

    return <ProjectIdProvider projectId={projectId}>{children}</ProjectIdProvider>;
};

export default ProjectLayout;
