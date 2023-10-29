import { z } from 'zod';

import { Project, ProjectPanel } from '@/features';
import { columnsFetch, projectsFetch, tasksFetch } from '@/requests';
import { groupBy } from '@/utils';


export const metadata = {
    title: 'Project',
};

export const revalidate = 0;

const DashboardPage = async ({ params }: {params: { projectId: string }}) => {
    const projectId = await z.coerce.number().parseAsync(params?.projectId);
    const [
        columns,
        tasks,
        projects,
    ] = await Promise.all([
        columnsFetch({ projectId }),
        tasksFetch({ projectId }),
        projectsFetch(),
    ]);

    const tasksGroup = groupBy(tasks, (i) => i.columnId);

    return (
        <div className="flex flex-col h-full">
            <ProjectPanel defaultProjects={projects} />
            <Project defaultColumns={columns} defaultTasks={tasksGroup} />
        </div>
    );
};

export default DashboardPage;
