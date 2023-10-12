import { notFound } from 'next/navigation';

import { Profile } from '@/features';
import { getServerUser } from '@/supabase/server';


export const metadata = {
    title: 'Profile',
};

const DashboardPage = async () => {
    const user = await getServerUser().catch(() => null);

    if (!user) return notFound();
    return (
        <Profile />
    );
};

export default DashboardPage;
