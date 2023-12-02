import { Button, Confirm } from '@/components';
import { useColumnSelector, useDisclosure } from '@/hooks';
import { useColumnDelete, useHistoryCreate } from '@/request-hooks';


const ColumnDelete = () => {
    const columnName = useColumnSelector(column => column.name);
    const { isOpen, close, open } = useDisclosure();
    const { trigger: historyCreate } = useHistoryCreate();
    const { trigger: deleteColumn, isMutating } = useColumnDelete({ onSuccess() {
        close();
        historyCreate({ body: `Delete column "${columnName}"` });
    } });

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
            <Confirm
                confirmButtonText="Delete"
                isLoading={isMutating}
                isOpen={isOpen}
                text="Are you sure you want to delete this column!   All tasks will be deleted!"
                onClose={close}
                onConfirm={() => deleteColumn()}
            />
        </>
    );
};

export default ColumnDelete;
