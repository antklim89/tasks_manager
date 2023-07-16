import { ForwardedRef, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

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
                className={twMerge('input input-bordered', props.className)}
            />
            {errorMessage ? <span className="">{errorMessage}</span> : null}
        </div>
    );
};

export default forwardRef(Input);
