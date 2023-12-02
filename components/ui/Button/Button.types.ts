import { ButtonHTMLAttributes, ReactNode } from 'react';

import { classes } from './Button';


export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode;
    outline?: boolean;
    color?: keyof typeof classes.color;
    size?: keyof typeof classes.size;
    isLoading?: boolean
}
