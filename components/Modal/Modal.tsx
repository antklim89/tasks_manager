'use client';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FaX } from 'react-icons/fa6';

import { cn } from '@/utils';

import Button from '../Button';

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

const Modal = ({ isOpen, children, onClose, size = 'md', className }: ModalProps) => {
    return (
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

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
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
                                    'w-full transform rounded-md bg-base-100 p-4 text-left align-middle shadow-xl transition-all',
                                    classes.size[size],
                                    className,
                                )}
                            >
                                <div className="flex justify-end -m-4">{/* eslint-disable-next-line react/jsx-max-depth */}
                                    <Button color='error' onClick={onClose}><FaX /></Button>
                                </div>
                                {children}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

Modal.Title = ModalTitle;
Modal.Footer = ModalFooter;
Modal.Body = ModalBody;

export default Modal;
