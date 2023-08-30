import { MenuProps } from './Menu.types';
import MenuItem from './MenuItem';


const Menu = ({ button, children }: MenuProps) => {
    return (
        <div className="dropdown dropdown-bottom dropdown-end">
            {button}
            <ul className="dropdown-content menu z-[1] p-2 shadow bg-base-200 rounded-box w-52">
                {children}
            </ul>
        </div>
    );
};

Menu.Item = MenuItem;

export default Menu;
