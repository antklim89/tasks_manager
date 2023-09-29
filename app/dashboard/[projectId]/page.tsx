import { z } from 'zod';

import { ProjectIdProvider } from '@/components';
import { Project, ProjectPanel } from '@/features';


export const metadata = {
    title: 'Project',
};

const DashboardPage = ({ params }: { params: { projectId?: string[] } }) => {
    const projectId = z.coerce.number().parse(params?.projectId);

    return (
        <ProjectIdProvider projectId={projectId}>
            <div className="flex flex-col h-full">
                <ProjectPanel projectId={projectId} />
                <Project projectId={projectId} />
            </div>
        </ProjectIdProvider>
    );
};

export default DashboardPage;
