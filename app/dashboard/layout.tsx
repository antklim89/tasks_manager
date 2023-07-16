import { ReactNode } from 'react';


const DashboardLayout = ({ login, children }: { login: ReactNode, children: ReactNode }) => {

    return (
        <div>
            <div>{login}</div>
        </div>
    );
};

export default DashboardLayout;
