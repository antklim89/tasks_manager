import { FaTrash } from 'react-icons/fa6';

import { Button } from '@/components';
import { useColumnDelete } from '@/requests';


const ColumnDelete = ({ id, projectId }: { id: number, projectId: number }) => {
    const { trigger: deleteColumn, isMutating } = useColumnDelete({ columnId: id, projectId });

    const handleDeleteColumn = () => {
        deleteColumn();
    };

    return (
        <Button
            aria-label="delete column"
            isLoading={isMutating}
            variant="ghost"
            onClick={handleDeleteColumn}
        >
            <FaTrash />
        </Button>
    );
};

export default ColumnDelete;
