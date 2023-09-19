import { Button, Confirm } from '@/components';
import { useDisclosure } from '@/hooks';
import { useTaskDelete } from '@/requests';
import { cn } from '@/utils';

import { TaskDeleteProps } from './Task.types';


const TaskDelete = ({ task, className }: TaskDeleteProps) => {
    const { isOpen, close, open } = useDisclosure();

    const { trigger: deleteTask, isMutating } = useTaskDelete(
        { taskId: task.id, columnId: task.columnId },
        { onSuccess: close },
    );

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
                onConfirm={deleteTask}
            />
        </>
    );
};

export default TaskDelete;
