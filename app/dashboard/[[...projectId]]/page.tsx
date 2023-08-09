import { z } from 'zod';

import { ProjectPanel } from '@/features';


export const metadata = {
    title: 'Dashboard',
};

const DashboardPage = ({ params }: { params: { projectId?: string[] } }) => {
    const projectId = z.coerce.number().optional().parse(params?.projectId?.[0]);

    return (
        <ProjectPanel projectId={projectId} />
    );
};

export default DashboardPage;
