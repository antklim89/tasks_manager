import { ReactNode } from 'react';

import { Auth } from '@/features';
import { getSupabaseUser } from '@/supabase/client';


const DashboardLayout = async ({ children }: { children: ReactNode }) => {
    const user = await getSupabaseUser().catch(() => null);

    if (user) return <>{children}</>;
    return <Auth />;
};

export default DashboardLayout;
