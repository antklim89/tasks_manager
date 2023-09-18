import Button from '../Button';
import Modal from '../Modal';

import { ConfirmProps } from './Confirm.types';


const Confirm = ({
    isOpen,
    onConfirm,
    isLoading,
    onClose,
    confirmButtonText = 'Confirm',
    text,
}: ConfirmProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Modal.Title className="whitespace-pre-wrap">
                {text}
            </Modal.Title>
            <Modal.Footer>
                <Button
                    outline
                    isLoading={isLoading}
                    size="sm"
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    color="error"
                    isLoading={isLoading}
                    size="sm"
                    onClick={onConfirm}
                >
                    {confirmButtonText}
                </Button>

            </Modal.Footer>
        </Modal>
    );
};

export default Confirm;
