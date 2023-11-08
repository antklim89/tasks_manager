import { Button, Confirm } from '@/components';
import { useDisclosure } from '@/hooks';
import { useColumnDelete } from '@/request-hooks';


const ColumnDelete = () => {
    const { isOpen, close, open } = useDisclosure();
    const { trigger: deleteColumn, isMutating } = useColumnDelete({ onSuccess: close });

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
