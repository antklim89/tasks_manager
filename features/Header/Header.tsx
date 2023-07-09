import Link from 'next/link';
import { FC } from 'react';


const Header: FC = () => {
    return (
        <header className="flex items-center container m-auto h-12">
            <div className="mr-auto">Tasks Manager</div>
            <div className="flex">
                <Link href="about">About</Link>
            </div>
        </header>
    );
};

export default Header;
