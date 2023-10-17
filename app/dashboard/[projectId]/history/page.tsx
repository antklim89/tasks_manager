import { History, ProjectPanel } from '@/features';


export const metadata = {
    title: 'History',
};

const MembersPage = async () => {
    return (
        <div>
            <ProjectPanel />
            <History />
        </div>
    );
};

export default MembersPage;
