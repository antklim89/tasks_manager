import { ReactNode } from 'react';


const DashboardLayout = ({ login, children }: { login: ReactNode, children: ReactNode }) => {
    const isAuth = false;

    if (isAuth) return children;
    return login;
};

export default DashboardLayout;
