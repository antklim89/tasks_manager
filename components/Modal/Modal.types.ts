import { ReactNode } from 'react';


export interface ModalProps {
    title?: ReactNode
    body?: ReactNode
    renderOpenButton: (close: () => void) => ReactNode
    renderCloseButton?: ((close: () => void) => ReactNode) | ReactNode
    renderConfirmButton?: ((close: () => void) => ReactNode) | ReactNode
}
