/* eslint-disable react/jsx-max-depth */
'use client';
import { Dialog as HUIDialog, Transition } from '@headlessui/react';
import { Fragment, memo, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { ModalProps } from './Modal.types';


const Confirm = ({ renderCloseButton, renderOpenButton, renderConfirmButton, body, title }: ModalProps) => {
    const [isOpen, setIsOpen] = useState(false);


    function closeModal() {
        setIsOpen(false);
    }

    return (
        <>
            {renderOpenButton(() => setIsOpen((p) => !p))}
            <Transition appear as={Fragment} show={isOpen}>
                <HUIDialog as="div" className="relative z-10" onClose={closeModal}>
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
                                <HUIDialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-base-100 p-4 text-left align-middle shadow-xl transition-all">
                                    {title
                                        ? (
                                            <HUIDialog.Title
                                                as="h3"
                                                className={twMerge('text-lg font-medium leading-6 text-base-content')}
                                            >
                                                {title}
                                            </HUIDialog.Title>
                                        )
                                        : null}

                                    {body}

                                    <div className="flex justify-end gap-2 mt-4">
                                        {typeof renderConfirmButton === 'function' ? renderConfirmButton?.(closeModal) : renderConfirmButton}
                                        {typeof renderCloseButton === 'function' ? renderCloseButton?.(closeModal) : renderCloseButton}
                                    </div>
                                </HUIDialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </HUIDialog>
            </Transition>
        </>
    );
};

export default memo(Confirm, (p, n) => p.body === n.body || p.title === n.title);
