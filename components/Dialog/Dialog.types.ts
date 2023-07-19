import { ReactNode } from 'react';


export interface DialogProps {
    openText?: string;
    openClassName?: string;
    title?: string;
    titleClassName?: string;
    closeText?: string;
    closeClassName?: string;
    children: ReactNode;
    confirmText?: string;
    confirmClassName?: string;
    onConfirm?: (() => void) | (() => Promise<void>)
}
