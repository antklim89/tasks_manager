import { z } from 'zod';

import { Members, ProjectPanel } from '@/features';
import { membersFetch } from '@/requests';


export const metadata = {
    title: 'Members',
};

const MembersPage = async ({ params }: {params: { projectId: string }}) => {
    const projectId = await z.coerce.number().parseAsync(params?.projectId);
    const members = await membersFetch({ projectId });

    return (
        <div className="flex flex-col h-full">
            <ProjectPanel />
            <Members defaultMembers={members} />
        </div>
    );
};

export default MembersPage;
