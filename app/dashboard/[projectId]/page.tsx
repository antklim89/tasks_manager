import { z } from 'zod';

import { Project, ProjectPanel } from '@/features';


export const metadata = {
    title: 'Project',
};

const DashboardPage = async ({ params }: { params: { projectId?: string[] } }) => {
    const projectId = await z.coerce.number().parseAsync(params?.projectId);

    return (
        <div className="flex flex-col h-full">
            <ProjectPanel projectId={projectId} />
            <Project />
        </div>
    );
};

export default DashboardPage;
