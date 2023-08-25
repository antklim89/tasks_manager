import { MenuProps } from './Menu.types';
import MenuItem from './MenuItem';


const Menu = ({ button, children }: MenuProps) => {
    return (
        <div className="dropdown dropdown-bottom dropdown-end">
            {button}

            {children}
        </div>
    );
};

Menu.Item = MenuItem;

export default Menu;
