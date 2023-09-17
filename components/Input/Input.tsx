import { ForwardedRef, createElement, forwardRef } from 'react';
import { FaEraser } from 'react-icons/fa6';

import { cn } from '@/utils';

import Button from '../Button';

import { InputProps } from './Input.types';


const Input = ({ errorMessage, label, as = 'input', reset, ...props }: InputProps, ref: ForwardedRef<HTMLElement>) => {
    return (
        <div className="form-control w-full relative">
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
                className: cn('input p-4 pr-7 h-auto resize-none placeholder:opacity-30 input-bordered', props.className, { 'input-error': errorMessage }),
            })}
            {reset
                ? (
                    <Button className="absolute p-0 rounded-full w-6 h-6 top-[3.3rem] right-1" size="xs" onClick={reset}><FaEraser /></Button>
                )
                : null}
            <span className="text-sm text-right text-error">{errorMessage ? errorMessage : ''}&nbsp;</span>
        </div>
    );
};

export default forwardRef(Input);
