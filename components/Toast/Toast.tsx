'use client';

import { Toaster, resolveValue, toast } from 'react-hot-toast';
import { FaX } from 'react-icons/fa6';
import { twMerge } from 'tailwind-merge';

import Button from '@/components/Button';


const classes = {
    type: {
        blank: 'alert-info',
        loading: '',
        custom: '',
        success: 'alert-success',
        error: 'alert-error',
    },
} as const;


const Toast = () => {
    return (
        <Toaster
            position="bottom-right"
        >
            {(t) => (
                <div>
                    <div className={twMerge('alert flex w-96', classes.type[t.type])}>
                        <p className="flex-grow">{resolveValue(t.message, t)}</p>

                        <Button className="self-start" color="ghost" onClick={() => toast.remove(t.id)}><FaX /></Button>
                    </div>
                </div>
            )}
        </Toaster>
    );
};


export default Toast;
