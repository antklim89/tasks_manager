'use client';
import { FocusEventHandler, useRef, useState } from 'react';

import { cn } from '@/utils';

import { MenuProps } from './Menu.types';
import MenuItem from './MenuItem';


const Menu = ({ button, children, className, listClassName, ...props }: MenuProps) => {
    const [isOverRightEdge, setIsOverRightEdge] = useState(false);
    const itemRef = useRef<HTMLUListElement>(null);

    const handleFocus: FocusEventHandler<HTMLDivElement> = (e) => {
        const { left } = e.currentTarget.getBoundingClientRect();
        const itemWidth = itemRef.current?.offsetWidth || 0;
        if (left + itemWidth + 10 < document.body.clientWidth) setIsOverRightEdge(true);
        else setIsOverRightEdge(false);
    };

    return (
        <div
            className={cn('dropdown dropdown-bottom', { 'dropdown-end': !isOverRightEdge }, className)}
            role='button'
            {...props}
            onFocus={handleFocus}
        >
            {button}
            <ul className={cn('dropdown-content menu z-[1] p-2 shadow bg-base-200 rounded-box w-52', listClassName)} ref={itemRef}>
                {children}
            </ul>
        </div>
    );
};

Menu.Item = MenuItem;

export default Menu;
