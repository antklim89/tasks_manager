import { twMerge } from 'tailwind-merge';

import { AlertProps } from './Alert.types';


const icons = {
    error: (
        <svg
            className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
        </svg>
    ),
} as const;

const className = {
    error: 'alert-error',
};

const Alert = ({ message, type = 'error' }: AlertProps) => {

    if (!message) return null;
    return (
        <div className={twMerge('alert', className[type])}>
            {icons[type]}
            <span>{message}</span>
        </div>
    );
};

export default Alert;
