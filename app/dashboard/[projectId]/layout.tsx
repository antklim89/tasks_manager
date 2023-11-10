import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { z } from 'zod';

import { ProjectProvider } from '@/components';
import { memberFetch } from '@/requests';


const ProjectLayout = async ({ children, params }: { children: ReactNode, params: { projectId?: string[] } }) => {
    const projectId = await z.coerce.number().parseAsync(params?.projectId);
    const member = await memberFetch({ projectId });

    if (!member) return notFound();
    return <ProjectProvider member={member} projectId={projectId}>{children}</ProjectProvider>;
};

export default ProjectLayout;
