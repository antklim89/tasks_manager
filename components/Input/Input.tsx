import { ForwardedRef, createElement, forwardRef } from 'react';

import { cn } from '@/utils';

import { InputProps } from './Input.types';


const Input = ({ errorMessage, label, as = 'input', ...props }: InputProps, ref: ForwardedRef<HTMLElement>) => {
    return (
        <div className="form-control w-full">
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
                className: cn('input p-4 h-auto resize-none placeholder:opacity-30 input-bordered', props.className, { 'input-error': errorMessage }),
            })}
            <span className="text-sm text-right text-error">{errorMessage ? errorMessage : ''}&nbsp;</span>
        </div>
    );
};

export default forwardRef(Input);
