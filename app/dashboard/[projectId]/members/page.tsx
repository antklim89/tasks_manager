import { z } from 'zod';

import { Members, ProjectPanel } from '@/features';


export const metadata = {
    title: 'Members',
};

const MembersPage = ({ params }: { params: { projectId?: string[] } }) => {
    const projectId = z.coerce.number().parse(params?.projectId);

    return (
        <div className="flex flex-col h-full">
            <ProjectPanel projectId={projectId} />
            <h3 className="text-center">Members</h3>
            <Members projectId={projectId} />
        </div>
    );
};

export default MembersPage;
