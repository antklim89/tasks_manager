import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

import { ButtonProps } from './Button.types';


export const className = {
    variant: {
        'primary': 'btn-primary',
        'secondary': 'btn-secondary',
        'accent': 'btn-accent',
    },
} as const;

const Button: FC<ButtonProps> = ({ variant = 'primary', children, ...props }) => {
    return (
        <button
            className={twMerge(props.className, className.variant[variant])}
            type="button"
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
