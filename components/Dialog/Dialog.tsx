/* eslint-disable react/jsx-max-depth */
'use client';
import { Dialog as HUIDialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { Button } from '@/components';

import { DialogProps } from './Dialog.types';


const Dialog = ({
    children,
    openClassName,
    openText = 'OPEN',
    closeClassName: closeClassname,
    closeText = 'CLOSE',
    title,
    titleClassName,
    confirmClassName,
    confirmText,
    onConfirm,
}: DialogProps) => {
    const [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    async function handleConfirm() {
        await onConfirm?.();
        setIsOpen(false);
    }

    return (
        <>
            <Button className={openClassName} onClick={openModal}>{openText}</Button>

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
                                    <HUIDialog.Title
                                        as="h3"
                                        className={twMerge('text-lg font-medium leading-6 text-base-content', titleClassName)}
                                    >
                                        {title}
                                    </HUIDialog.Title>

                                    {children}

                                    <div className="flex justify-end gap-2 mt-4">
                                        <Button
                                            className={closeClassname}
                                            onClick={closeModal}
                                        >
                                            {closeText}
                                        </Button>
                                        {onConfirm
                                            ? (
                                                <Button
                                                    className={confirmClassName}
                                                    onClick={handleConfirm}
                                                >
                                                    {confirmText}
                                                </Button>
                                            )
                                            : null}
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

export default Dialog;
