import { Members, ProjectPanel } from '@/features';


export const metadata = {
    title: 'Members',
};

const MembersPage = async () => {
    return (
        <div className="flex flex-col h-full">
            <ProjectPanel />
            <Members />
        </div>
    );
};

export default MembersPage;
