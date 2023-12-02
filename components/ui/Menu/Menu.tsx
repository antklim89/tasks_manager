'use client';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/utils';

import { MenuProps } from './Menu.types';
import MenuItem from './MenuItem';


const Menu = ({ button, children, className, ...props }: MenuProps) => {
    const [isLeft, setIsLeft] = useState(false);
    const itemRef = useRef<HTMLUListElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const element = document.querySelector('.overflow-x-scroll');
        let timeoutId: NodeJS.Timeout;
        const itemWidth = itemRef.current?.getBoundingClientRect().width;
        
        const listener = () => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                const menuLeft = menuRef.current?.getBoundingClientRect().left;
                if (!menuLeft || !itemWidth) return;
                
                if (menuLeft - itemWidth < 0) setIsLeft(true);
                else setIsLeft(false);
            }, 100);
        };
        element?.addEventListener('scroll', listener);
        return () => {
            element?.removeEventListener('scroll', listener);
        };
    }, []);
    

    return (
        <div className={cn('dropdown dropdown-bottom', { 'dropdown-end': !isLeft }, className)} ref={menuRef} {...props}>
            {button}
            <ul className="dropdown-content menu z-[1] p-2 shadow bg-base-200 rounded-box w-52" ref={itemRef}>
                {children}
            </ul>
        </div>
    );
};

Menu.Item = MenuItem;

export default Menu;
