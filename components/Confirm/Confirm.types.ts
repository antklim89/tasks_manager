import { ButtonHTMLAttributes, MouseEvent } from 'react';


export interface ConfirmProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'|'onClick'> {
    isOpen: boolean
    isLoading?: boolean
    onConfirm: (e: MouseEvent<HTMLButtonElement>) => void,
    onClose: () => void
    confirmButtonText?: string
    text: string
}
