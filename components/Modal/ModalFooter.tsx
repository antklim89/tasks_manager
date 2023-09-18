import { ReactNode } from 'react';

import { cn } from '@/utils';


const ModalFooter = ({ children, className }: { children: ReactNode, className?: string }) => {
    return (
        <div className={cn('flex justify-end gap-2', className)}>
            {children}
        </div>
    );
};

export default ModalFooter;
