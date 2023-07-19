import { ControlPanel, NewProject } from '@/features';


export const metadata = {
    title: 'Dashboard',
};

const DashboardPage = () => {

    return (
        <ControlPanel>
            <NewProject />
        </ControlPanel>
    );
};

export default DashboardPage;
