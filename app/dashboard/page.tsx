import { DashboardHome, ProjectPanel } from '@/features';


export const metadata = {
    title: 'Dashboard',
};

const DashboardPage = () => {

    return (
        <div className="flex flex-col h-full">
            <ProjectPanel />
            <DashboardHome />
        </div>
    );
};

export default DashboardPage;
