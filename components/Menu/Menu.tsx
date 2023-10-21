import { cn } from '@/utils';

import { MenuProps } from './Menu.types';
import MenuItem from './MenuItem';


const Menu = ({ button, children, className, ...props }: MenuProps) => {
    return (
        <div className={cn('dropdown dropdown-bottom dropdown-end', className)} {...props}>
            {button}
            <ul className="dropdown-content menu z-[1] p-2 shadow bg-base-200 rounded-box w-52">
                {children}
            </ul>
        </div>
    );
};

Menu.Item = MenuItem;

export default Menu;
