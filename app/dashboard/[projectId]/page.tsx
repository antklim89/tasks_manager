import { Project, ProjectPanel } from '@/features';


export const metadata = {
    title: 'Project',
};

const DashboardPage = async () => {
    return (
        <div className="flex flex-col h-full">
            <ProjectPanel />
            <Project />
        </div>
    );
};

export default DashboardPage;
