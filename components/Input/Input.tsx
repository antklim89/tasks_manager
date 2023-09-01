import { ForwardedRef, forwardRef } from 'react';

import { cn } from '@/utils';

import { InputProps } from './Input.types';


const Input = ({ errorMessage, label, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    return (
        <div className="form-control">
            {label
                ? (
                    <label className="label">
                        <span className="label-text">{label}</span>
                    </label>
                )
                : null}
            <input
                ref={ref}
                {...props}
                className={cn('input placeholder:opacity-30 input-bordered', props.className, { 'input-error': errorMessage })}
            />
            <span className="text-sm text-right text-error">{errorMessage ? errorMessage : ''}&nbsp;</span>
        </div>
    );
};

export default forwardRef(Input);
