

export interface ConfirmProps {
    isOpen: boolean
    isLoading?: boolean
    onConfirm: () => void
    onClose: () => void
    confirmButtonText?: string
    text: string
}
