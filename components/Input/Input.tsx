import { ForwardedRef, createElement, forwardRef, useCallback } from 'react';
import { FaX } from 'react-icons/fa6';

import { cn } from '@/utils';

import Button from '../Button';

import { InputProps } from './Input.types';


const Input = ({
    errorMessage, label, as = 'input', reset, className, ...props
}: InputProps, ref: ForwardedRef<HTMLElement>) => {
    const handleReset = useCallback(() => reset?.(), []);

    return (
        <div className="flex items-center relative">
            {label
                ? (
                    <label className="label">
                        <span className="label-text">{label}</span>
                    </label>
                )
                : null}
            {createElement(as, {
                ref,
                ...props,
                className: cn('input p-4 pr-7 h-auto resize-none placeholder:opacity-30 input-bordered w-full', className, { 'input-error': errorMessage }),
            })}
            {reset
                ? (
                    <Button
                        className="rounded-full -ml-10"
                        color="ghost"
                        size="xs"
                        onClick={handleReset}
                    ><FaX />
                    </Button>
                )
                : null}
            <span className="text-sm text-right text-error">{errorMessage ? errorMessage : ''}</span>
        </div>
    );
};

export default forwardRef(Input);
