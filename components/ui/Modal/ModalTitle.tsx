import { Dialog } from '@headlessui/react';
import { ReactNode, useContext } from 'react';
import { FaX } from 'react-icons/fa6';

import { cn } from '@/utils';

import Button from '../Button';

import { ModalContext } from './Modal';


const ModalTitle = ({ children, className }: { children: ReactNode, className?: string }) => {
    const { onClose } = useContext(ModalContext);

    return (
        <Dialog.Title
            as="h3"
            className={cn('text-lg font-medium leading-6 text-base-content flex justify-between', className)}
        >
            <Button className='invisible btn-sm self-start'><FaX /></Button>
            <span className='px-1 pt-4 pb-1 text-center'>{children}</span>
            <Button className='btn-sm self-start' color='error' onClick={onClose}><FaX /></Button>
        </Dialog.Title>
    );
};

export default ModalTitle;
