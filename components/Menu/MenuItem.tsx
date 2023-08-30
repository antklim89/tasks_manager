import { MenuItemProps } from './Menu.types';


const MenuItem = ({ children }: MenuItemProps) => {
    return (
        <li className="hover:bg-slate-500 w-full">
            {children}
        </li>
    );
};

export default MenuItem;
