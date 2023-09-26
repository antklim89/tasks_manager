import { z } from 'zod';

import { Project, ProjectPanel } from '@/features';


export const metadata = {
    title: 'Project',
};

const DashboardPage = ({ params }: { params: { projectId?: string[] } }) => {
    const projectId = z.coerce.number().parse(params?.projectId);

    return (
        <div className="flex flex-col h-full">
            <ProjectPanel projectId={projectId} />
            <Project projectId={projectId} />
        </div>
    );
};

export default DashboardPage;
