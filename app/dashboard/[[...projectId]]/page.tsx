import { z } from 'zod';

import { DashboardHome, Project, ProjectPanel } from '@/features';


export const metadata = {
    title: 'Dashboard',
};

const DashboardPage = ({ params }: { params: { projectId?: string[] } }) => {
    const projectId = z.coerce.number().optional().parse(params?.projectId?.[0]);

    return (
        <div className="flex flex-col h-full">
            <ProjectPanel projectId={projectId} />
            { projectId ? <Project projectId={projectId} /> : <DashboardHome /> }
        </div>
    );
};

export default DashboardPage;
