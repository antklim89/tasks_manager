import { ReactNode, HTMLAttributes } from 'react';


export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    button: ReactNode
    listClassName?: string
}

export interface MenuItemProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
}
