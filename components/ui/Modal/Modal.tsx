'use client';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, createContext } from 'react';

import { cn } from '@/utils';

import { ModalProps } from './Modal.types';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import ModalTitle from './ModalTitle';


export const classes = {
    size: {
        'xs': 'max-w-xs',
        'sm': 'max-w-sm',
        'md': 'max-w-md',
        'lg': 'max-w-lg',
        'xl': 'max-w-xl',
        '2xl': 'max-w-2xl',
        '3xl': 'max-w-3xl',
        '4xl': 'max-w-4xl',
        '5xl': 'max-w-5xl',
        'full': 'max-w-full',
    },
};

export const ModalContext = createContext<{ onClose: () => void }>({ onClose: () => null });

const Modal = ({ isOpen, children, onClose, size = 'md', className }: ModalProps) => {
    return (
        <ModalContext.Provider value={{ onClose }}>
            <Transition appear as={Fragment} show={isOpen}>
                <Dialog as="div" className="relative z-10 w-52" onClose={onClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className={cn(
                                    'w-full transform rounded-md bg-base-100 text-left align-middle shadow-xl transition-all',
                                    classes.size[size],
                                    className,
                                )}
                            >
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </ModalContext.Provider>
    );
};

Modal.Title = ModalTitle;
Modal.Footer = ModalFooter;
Modal.Body = ModalBody;

export default Modal;
