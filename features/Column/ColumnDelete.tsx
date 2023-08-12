import { FaTrash } from 'react-icons/fa6';

import { Button, Modal } from '@/components';
import { useColumnDelete } from '@/requests';


const ColumnDelete = ({ id, projectId }: { id: number, projectId: number }) => {
    const { trigger: deleteColumn, isMutating } = useColumnDelete({ columnId: id, projectId });

    const handleDeleteColumn = async () => {
        await deleteColumn();
    };

    return (
        <Modal
            renderCloseButton={(close) => (
                <Button
                    outline
                    isLoading={isMutating}
                    size="sm"
                    onClick={close}
                >
                    Cancel
                </Button>
            )}
            renderConfirmButton={() => (
                <Button
                    color="error"
                    isLoading={isMutating}
                    size="sm"
                    onClick={handleDeleteColumn}
                >
                    Delete
                </Button>
            )}
            renderOpenButton={(close) => (
                <Button
                    aria-label="delete column"
                    color="ghost"
                    isLoading={isMutating}
                    onClick={close}
                >
                    <FaTrash />
                </Button>
            )}
            title="Are you sure you want to delete this column!"
        />
    );
};

export default ColumnDelete;
