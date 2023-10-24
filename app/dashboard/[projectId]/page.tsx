import { z } from 'zod';

import { Project, ProjectPanel } from '@/features';
import { columnsFetch, tasksFetch } from '@/requests';
import { groupBy } from '@/utils';


export const metadata = {
    title: 'Project',
};

const DashboardPage = async ({ params }: {params: { projectId: string }}) => {
    const projectId = await z.coerce.number().parseAsync(params?.projectId);
    const columns = await columnsFetch(projectId);
    const tasks = groupBy(await tasksFetch({ projectId }), (i) => i.columnId);

    return (
        <div className="flex flex-col h-full">
            <ProjectPanel />
            <Project defaultColumns={columns} defaultTasks={tasks} />
        </div>
    );
};

export default DashboardPage;

