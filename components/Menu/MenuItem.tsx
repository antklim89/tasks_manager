import { MenuItemProps } from './Menu.types';


const MenuItem = ({ children }: MenuItemProps) => {
    return (
        <div className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52">
            {children}
        </div>
    );
};

export default MenuItem;
