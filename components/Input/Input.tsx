import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

import { InputProps } from './Input.types';


const Input: FC<InputProps> = ({ errorMessage, label, ...props }) => {
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
                {...props}
                className={twMerge('input input-bordered', props.className)}
            />
            {errorMessage ? <span className="">{errorMessage}</span> : null}
        </div>
    );
};

export default Input;
