import { Dialog } from '@headlessui/react';
import { ReactNode } from 'react';


const ModalTitle = ({ children }: { children: ReactNode }) => {
    return (
        <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-base-content mb-4"
        >
            {children}
        </Dialog.Title>
    );
};

export default ModalTitle;
