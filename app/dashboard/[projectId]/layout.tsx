import { ReactNode } from 'react';
import { z } from 'zod';

import { MemberProvider, ProjectProvider } from '@/components';
import { memberFetch, projectFetch } from '@/requests';


const ProjectLayout = async ({ children, params }: { children: ReactNode, params: { projectId?: string[] } }) => {
    const projectId = await z.coerce.number().parseAsync(params?.projectId);
    const member = await memberFetch({ projectId });
    const project = await projectFetch({ projectId });

    return (
        <ProjectProvider defaultProject={project}>
            <MemberProvider defaultMember={member}>
                {children}
            </MemberProvider>
        </ProjectProvider>
    );
};

export default ProjectLayout;
