import { ReactNode } from 'react';

import { Auth } from '@/features';
import { getServerUser } from '@/supabase/server';


const DashboardLayout = async ({ children }: { children: ReactNode }) => {
    const user = await getServerUser().catch(() => null);

    if (user) return <>{children}</>;
    return <Auth />;
};

export default DashboardLayout;
