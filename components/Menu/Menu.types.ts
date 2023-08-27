import { ReactNode, HTMLAttributes } from 'react';


export interface MenuProps {
    children: ReactNode
    button: ReactNode
}

export interface MenuItemProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
}
