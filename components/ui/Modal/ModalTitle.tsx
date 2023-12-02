import { Dialog } from '@headlessui/react';
import { ReactNode } from 'react';

import { cn } from '@/utils';


const ModalTitle = ({ children, className }: { children: ReactNode, className?: string }) => {
    return (
        <Dialog.Title
            as="h3"
            className={cn('text-lg font-medium leading-6 text-base-content mb-4', className)}
        >
            {children}
        </Dialog.Title>
    );
};

export default ModalTitle;
