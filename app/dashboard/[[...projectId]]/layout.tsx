import { ReactNode } from 'react';

import { serverComponentClient } from '@/utils';


const DashboardLayout = async ({ login, children }: { login: ReactNode, children: ReactNode }) => {
    const { data } = await serverComponentClient().auth.getUser();

    if (data.user) return <>{children}</>;
    return <>{login}</>;
};

export default DashboardLayout;
