import { twMerge } from 'tailwind-merge';

import { ButtonProps } from './Button.types';


export const className = {
    variant: {
        'link': 'btn-link',
        'ghost': 'btn-ghost',
        'outline': 'btn-outline',
    },
    color: {
        'primary': 'btn-primary',
        'secondary': 'btn-secondary',
        'accent': 'btn-accent',
    },
} as const;

const Button = ({
    variant, color = 'primary', children, isLoading, disabled, ...props
}: ButtonProps) => {
    return (
        <button
            type="button"
            {...props}
            className={twMerge('btn', props.className, variant && className.variant[variant], className.color[color])}
            disabled={disabled || isLoading}
        >
            {isLoading ? <span className="loading loading-bars loading-sm" /> : null}
            {children}
        </button>
    );
};

export default Button;
