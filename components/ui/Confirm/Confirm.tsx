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
    ...props
}: ConfirmProps) => {

    return (
        <Modal className="p-0" isOpen={isOpen} onClose={onClose}>
            <Modal.Title className="whitespace-pre-wrap mb-6">
                {text}
            </Modal.Title>
            <Modal.Footer className="gap-0">
                <Button
                    outline
                    className="flex-1 rounded-none rounded-bl-md"
                    isLoading={isLoading}
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    className="flex-1 rounded-none rounded-br-md"
                    isLoading={isLoading}
                    {...props}
                    onClick={onConfirm}
                >
                    {confirmButtonText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Confirm;
