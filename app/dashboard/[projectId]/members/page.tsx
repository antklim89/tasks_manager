import { z } from 'zod';

import { Members, ProjectPanel } from '@/features';


export const metadata = {
    title: 'Members',
};

const MembersPage = async ({ params }: { params: { projectId?: string[] } }) => {
    const projectId = await z.coerce.number().parseAsync(params?.projectId);

    return (
        <div className="flex flex-col h-full">
            <ProjectPanel projectId={projectId} />
            <Members />
        </div>
    );
};

export default MembersPage;
