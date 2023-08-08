import { ReactNode } from 'react';

import { getServerComponentUser } from '@/utils';


const DashboardLayout = async ({ login, children }: { login: ReactNode, children: ReactNode }) => {
    const user = await getServerComponentUser().catch(() => null);

    if (user) return <>{children}</>;
    return <>{login}</>;
};

export default DashboardLayout;
