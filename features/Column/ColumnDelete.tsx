import { Button, Modal } from '@/components';
import { useColumnDelete } from '@/requests';
import { useDisclosure } from '@/utils';


const ColumnDelete = ({ id, projectId }: { id: number, projectId: number }) => {
    const { isOpen, close, open } = useDisclosure();
    const { trigger: deleteColumn, isMutating } = useColumnDelete({ columnId: id, projectId });

    const handleDeleteColumn = async () => {
        await deleteColumn();
        close();
    };

    return (
        <>
            <Button
                aria-label="delete column"
                className="w-full"
                color="ghost"
                isLoading={isMutating}
                onClick={open}
            >
                Delete
            </Button>
            <Modal isOpen={isOpen} onClose={close}>
                <Modal.Title>
                    Are you sure you want to delete this column!
                </Modal.Title>
                <Modal.Footer>
                    <Button
                        outline
                        isLoading={isMutating}
                        size="sm"
                        onClick={close}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="error"
                        isLoading={isMutating}
                        size="sm"
                        onClick={handleDeleteColumn}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ColumnDelete;
