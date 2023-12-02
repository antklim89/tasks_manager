'use client';
import type { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa6';

import { Button, Menu } from '@/components';

import HeaderLogout from './HeaderLogout';


const HeaderMenu = ({ user }: { user: User | null }) => {
    if (!user) return null;
    return (
        <Menu button={<Button aria-label="user menu" color="ghost" size="sm"><FaUser /></Button>}>
            <span className="text-center py-4">{user.email}</span>
            <Link className="btn btn-ghost" href="/dashboard/profile">PROFILE</Link>
            <HeaderLogout />
        </Menu>
    );
};

export default HeaderMenu;
