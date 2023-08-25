import { MenuItemProps } from './Menu.types';


const MenuItem = ({ children }: MenuItemProps) => {
    return (
        <button className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52" type="button">
            {children}
        </button>
    );
};

export default MenuItem;
