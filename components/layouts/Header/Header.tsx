import Image from 'next/image';
import Link from 'next/link';

import { getSupabaseUser } from '@/supabase/client';

import HeaderMenu from './HeaderMenu';


const Header = async () => {
    const user = await getSupabaseUser().catch(() => null);

    return (
        <header className="flex items-center container h-12">
            <Link className="mr-auto flex items-center" href="/">
                <Image
                    alt="logo"
                    height={48}
                    src="/favicon.svg"
                    width={48}
                />
                <span className="hidden sm:inline text-2xl font-bold">TASK MANAGER</span>
            </Link>

            <div className="flex gap-4 items-center">
                <Link href="/dashboard">{user ? 'Dashboard' : 'Sign In'}</Link>
                <HeaderMenu user={user} />
            </div>
        </header>
    );
};

export default Header;
