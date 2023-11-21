import { DashboardHome, ProjectPanel } from '@/features';
import { projectsFetch } from '@/requests';


export const metadata = {
    title: 'Dashboard',
};

const DashboardPage = async () => {
    const projects = await projectsFetch();

    return (
        <div className="flex flex-col h-full">
            <ProjectPanel />
            <DashboardHome defaultProjects={projects} />
        </div>
    );
};

export default DashboardPage;
