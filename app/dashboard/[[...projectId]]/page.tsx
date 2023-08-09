import { z } from 'zod';

import { DashboardHome, Project, ProjectPanel } from '@/features';


export const metadata = {
    title: 'Dashboard',
};

const DashboardPage = ({ params }: { params: { projectId?: string[] } }) => {
    const projectId = z.coerce.number().optional().parse(params?.projectId?.[0]);

    return (
        <>
            <ProjectPanel projectId={projectId} />
            { projectId ? <Project projectId={projectId} /> : <DashboardHome /> }
        </>
    );
};

export default DashboardPage;
