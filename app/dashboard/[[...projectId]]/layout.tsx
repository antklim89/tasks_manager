import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';


const DashboardLayout = async ({ login, children }: { login: ReactNode, children: ReactNode }) => {
    const supabase = createServerComponentClient({ cookies });
    const { data } = await supabase.auth.getUser();

    if (data.user) return <>{children}</>;
    return <>{login}</>;
};

export default DashboardLayout;
