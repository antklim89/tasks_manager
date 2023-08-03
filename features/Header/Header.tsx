import Link from 'next/link';

import { serverComponentClient } from '@/utils';


const Header = async () => {
    const { data } = await serverComponentClient().auth.getUser();

    return (
        <header className="flex items-center container px-2 m-auto h-12">
            <Link className="mr-auto" href="/">Tasks Manager</Link>

            <div className="flex gap-4">
                <Link href="/dashboard">{data.user ? 'Dashboard' : 'Sign In'}</Link>
                <Link href="/about">About</Link>
            </div>
        </header>
    );
};

export default Header;
