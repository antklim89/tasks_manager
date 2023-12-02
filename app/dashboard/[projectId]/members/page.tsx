import { z } from 'zod';

import { ProjectDefaultsProvider, Members, ProjectPanel } from '@/components';
import { membersFetch } from '@/requests';


export const metadata = {
    title: 'Members',
};

const MembersPage = async ({ params }: {params: { projectId: string }}) => {
    const projectId = await z.coerce.number().parseAsync(params?.projectId);
    const members = await membersFetch({ projectId });

    return (
        <ProjectDefaultsProvider defaultMembers={members}>
            <div className="flex flex-col h-full">
                <ProjectPanel />
                <Members />
            </div>
        </ProjectDefaultsProvider>
    );
};

export default MembersPage;
