import { twMerge } from 'tailwind-merge';

import { ButtonProps } from './Button.types';


export const classes = {
    color: {
        'neutral': 'btn-neutral',
        'primary': 'btn-primary',
        'secondary': 'btn-secondary',
        'accent': 'btn-accent',
        'ghost': 'btn-ghost',
        'link': 'btn-link',
        'info': 'btn-info',
        'success': 'btn-success',
        'warning': 'btn-warning',
        'error': 'btn-error',
    },
    size: {
        'lg': 'btn-lg',
        'sm': 'btn-sm',
        'xs': 'btn-xs',
    },
} as const;

const Button = ({
    outline, color = 'primary', size, children, isLoading, disabled, className, ...props
}: ButtonProps) => {
    return (
        <button
            type="button"
            {...props}
            className={twMerge(
                'btn flex-nowrap relative',
                className,
                classes.color[color],
                size && classes.size[size],
                outline && 'btn-outline',
            )}
            disabled={disabled || isLoading}
        >
            {isLoading ? <span className="loading loading-bars loading-sm text-white absolute left-1/2 -translate-x-1/2" /> : null}
            {children}
        </button>
    );
};

export default Button;
