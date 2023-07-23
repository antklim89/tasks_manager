import { ControlPanel, NewProject, SelectProject } from '@/features';


export const metadata = {
    title: 'Dashboard',
};

const DashboardPage = () => {

    return (
        <ControlPanel>
            <NewProject />
            <SelectProject />
        </ControlPanel>
    );
};

export default DashboardPage;
