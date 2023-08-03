import { twMerge } from 'tailwind-merge';

import { ButtonProps } from './Button.types';


export const className = {
    variant: {
        'primary': 'btn-primary',
        'secondary': 'btn-secondary',
        'accent': 'btn-accent',
        'link': 'btn-link',
    },
} as const;

const Button = ({ variant = 'primary', children, ...props }: ButtonProps) => {
    return (
        <button
            type="button"
            {...props}
            className={twMerge('btn', props.className, className.variant[variant])}
        >
            {children}
        </button>
    );
};

export default Button;
