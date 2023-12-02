import { Button, Confirm } from '@/components';
import { useDisclosure, useTaskSelector } from '@/hooks';
import { useHistoryCreate, useTaskDelete } from '@/request-hooks';
import { cn } from '@/utils';


const TaskDelete = ({ className }: { className: string }) => {
    const { isOpen, close, open } = useDisclosure();
    const { trigger: historyCreate } = useHistoryCreate();
    const taskTitle = useTaskSelector(task => task.title);

    const { trigger: deleteTask, isMutating } = useTaskDelete({ 
        onSuccess() {
            close();
            historyCreate({ body: `Task "${taskTitle}" deleted.` });
        }, 
    });

    return (
        <>
            <Button
                aria-label="delete column"
                className={cn('w-full', className)}
                isLoading={isMutating}
                onClick={open}
            >
                Delete
            </Button>
            <Confirm
                confirmButtonText="Delete"
                isLoading={isMutating}
                isOpen={isOpen}
                text="Are you sure you want to delete this task!"
                onClose={close}
                onConfirm={() => deleteTask()}
            />
        </>
    );
};

export default TaskDelete;
