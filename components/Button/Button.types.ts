import { ButtonHTMLAttributes, ReactNode } from 'react';

import { className } from './Button';


export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode
    variant?: keyof typeof className.variant
}
