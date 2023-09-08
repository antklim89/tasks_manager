import { ReactNode } from 'react';

import { classes } from './Modal';


export interface ModalProps {
    isOpen: boolean
    children: ReactNode
    onClose: () => void
    size?: keyof typeof classes['size']
}
