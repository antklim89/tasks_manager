import { z } from 'zod';

import { NewProject, Project, SelectProject } from '@/features';


export const metadata = {
    title: 'Dashboard',
};

const DashboardPage = ({ params }: { params: { projectId?: string[] } }) => {
    const projectId = z.coerce.number().optional().parse(params?.projectId?.[0]);

    return (
        <>
            <div className="flex py-4 bpx-2">
                <NewProject />
                <SelectProject projectId={projectId} />
            </div>
            <Project />
        </>
    );
};

export default DashboardPage;
