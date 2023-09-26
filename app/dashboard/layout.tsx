import { ReactNode } from 'react';

import { getServerUser } from '@/supabase/server';


const DashboardLayout = async ({ login, children }: { login: ReactNode, children: ReactNode }) => {
    const user = await getServerUser().catch(() => null);

    if (user) return <>{children}</>;
    return <>{login}</>;
};

export default DashboardLayout;
