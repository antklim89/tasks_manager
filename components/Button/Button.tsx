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

const Button = ({ variant = 'primary', children, isLoading, disabled, ...props }: ButtonProps) => {
    return (
        <button
            type="button"
            {...props}
            className={twMerge('btn', props.className, className.variant[variant])}
            disabled={disabled || isLoading}
        >
            {isLoading ? <span className="loading loading-bars loading-sm" /> : null}
            {children}
        </button>
    );
};

export default Button;
