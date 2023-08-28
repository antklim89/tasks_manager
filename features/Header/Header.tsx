import Link from 'next/link';
import { FaUser } from 'react-icons/fa6';

import { Button, Menu } from '@/components';
import { getServerUser } from '@/utils';

import HeaderLogout from './HeaderLogout';


const Header = async () => {
    const user = await getServerUser().catch(() => null);

    return (
        <header className="flex items-center container px-2 m-auto h-12">
            <Link className="mr-auto" href="/">Tasks Manager</Link>

            <div className="flex gap-4 items-center">
                <Link href="/dashboard">{user ? 'Dashboard' : 'Sign In'}</Link>
                <Link href="/about">About</Link>
                {user
                    ? (
                        <Menu button={<Button aria-label="user menu" color="ghost" size="sm"><FaUser /></Button>}>
                            <Menu.Item>
                                <HeaderLogout />
                            </Menu.Item>
                        </Menu>
                    )
                    : null}
            </div>
        </header>
    );
};

export default Header;
