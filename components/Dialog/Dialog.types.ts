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
    onConfirm?: ((close: () => void) => void) | ((close: () => void) => Promise<void>)
    isLoading?: boolean
}
