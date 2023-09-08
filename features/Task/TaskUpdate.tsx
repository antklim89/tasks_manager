import { Button, Modal, TaskEditForm } from '@/components';
import { useTaskUpdate } from '@/requests';
import { cn, useDisclosure } from '@/utils';

import { TaskUpdateProps } from './Task.types';


const TaskUpdate = ({ task, className }: TaskUpdateProps) => {
    const { isOpen, close, open } = useDisclosure();

    const { trigger: updateTask, isMutating } = useTaskUpdate({ columnId: task.columnId, taskId: task.id }, {
        onSuccess: () => close(),
    });

    return (
        <>
            <Button
                className={cn('w-full', className)}
                isLoading={isMutating}
                onClick={open}
            >
                Update
            </Button>

            <Modal isOpen={isOpen} onClose={close}>
                <Modal.Body>
                    <TaskEditForm defaultValues={task} onSubmit={updateTask}>
                        <Modal.Footer>
                            <Button outline isLoading={isMutating} onClick={close}>Cancel</Button>
                            <Button isLoading={isMutating} type="submit">Update</Button>
                        </Modal.Footer>
                    </TaskEditForm>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default TaskUpdate;
