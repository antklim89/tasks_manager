import { z } from 'zod';

import { ProjectDefaultsProvider } from '@/components';
import { History, ProjectPanel } from '@/features';
import { historyFetch } from '@/requests';


export const metadata = {
    title: 'History',
};

const MembersPage = async ({ params }: {params: { projectId: string }}) => {
    const projectId = await z.coerce.number().parseAsync(params?.projectId);
    const history = await historyFetch({ projectId });
    
    return (
        <ProjectDefaultsProvider defaultHistory={history} >
            <div>
                <ProjectPanel />
                <History />
            </div>
        </ProjectDefaultsProvider>
    );
};

export default MembersPage;
