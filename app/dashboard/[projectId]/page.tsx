import { z } from 'zod';

import { ProjectDefaultsProvider, Project, ProjectPanel } from '@/components';
import { columnsFetch, tasksFetch } from '@/requests';
import { groupBy } from '@/utils';


export const metadata = {
    title: 'Project',
};


const DashboardPage = async ({ params }: {params: { projectId: string }}) => {
    const projectId = await z.coerce.number().parseAsync(params?.projectId);
    const [
        columns,
        tasks,
    ] = await Promise.all([
        columnsFetch({ projectId }),
        tasksFetch({ projectId }),
    ]);

    const tasksGroup = groupBy(tasks, (i) => i.columnId);

    return (
        <ProjectDefaultsProvider defaultColumns={columns} defaultTasks={tasksGroup}>
            <div className="flex flex-col h-[calc(100dvh-var(--header-height)-var(--footer-height))]">
                <ProjectPanel />
                <Project />
            </div>
        </ProjectDefaultsProvider>
    );
};

export default DashboardPage;
