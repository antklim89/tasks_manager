'use client';
import { Toaster, resolveValue, toast } from 'react-hot-toast';
import { FaX, FaRegCircleCheck, FaCircleExclamation } from 'react-icons/fa6';

import Button from '@/components/ui/Button';
import { cn } from '@/utils';


const classes = {
    type: {
        blank: '',
        loading: 'alert-info',
        custom: '',
        success: 'bg-green-900',
        error: 'bg-red-900',
    },
    icon: {
        blank: null,
        loading: <span className="loading loading-spinner" />,
        custom: null,
        success: <FaRegCircleCheck className="w-8 h-8" />,
        error: <FaCircleExclamation className="w-8 h-8" />,
    },
} as const;


const Toast = () => {
    return (
        <Toaster
            position="bottom-right"
        >
            {(t) => (
                <div>
                    <div className={cn('alert p-2 flex w-80', classes.type[t.type])}>
                        {classes.icon[t.type]}
                        <p className="flex-grow">{resolveValue(t.message, t)}</p>
                        <Button className="self-start" color="ghost" onClick={() => toast.remove(t.id)}><FaX /></Button>
                    </div>
                </div>
            )}
        </Toaster>
    );
};


export default Toast;
