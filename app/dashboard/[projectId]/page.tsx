import { z } from 'zod';

import { Project, ProjectPanel } from '@/features';
import { columnsFetch } from '@/requests';


export const metadata = {
    title: 'Project',
};

const DashboardPage = async ({ params }: {params: { projectId: string }}) => {
    const projectId = await z.coerce.number().parseAsync(params?.projectId);
    const columns = await columnsFetch(projectId);

    return (
        <div className="flex flex-col h-full">
            <ProjectPanel />
            <Project columns={columns} />
        </div>
    );
};

export default DashboardPage;
