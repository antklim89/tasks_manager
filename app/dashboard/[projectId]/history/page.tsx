import { z } from 'zod';

import { ProjectDefaultsProvider, History, ProjectPanel } from '@/components';
import { historyFetch } from '@/requests';


export const metadata = {
    title: 'History',
};

const HistoryPage = async ({ params, searchParams }: {params: { projectId: string }, searchParams: { 'start-at': string }}) => {
    const projectId = await z.coerce.number().parseAsync(params?.projectId);
    const startDate = await z.string().optional().parseAsync(searchParams?.['start-at']);
    const history = await historyFetch({ projectId, startDate });
    
    return (
        <ProjectDefaultsProvider defaultHistory={history} historyStartDate={startDate} >
            <div>
                <ProjectPanel />
                <History />
            </div>
        </ProjectDefaultsProvider>
    );
};

export default HistoryPage;
