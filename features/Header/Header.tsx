import Link from 'next/link';
import { FC } from 'react';


const Header: FC = () => {
    return (
        <header className="flex items-center container px-2 m-auto h-12">
            <Link className="mr-auto" href="/">Tasks Manager</Link>
            <div className="flex gap-4">
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/about">About</Link>
            </div>
        </header>
    );
};

export default Header;
