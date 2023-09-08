import React from 'react';

import { Button, Modal } from '@/components';
import { useTaskDelete } from '@/requests';
import { cn, useDisclosure } from '@/utils';

import { TaskDeleteProps } from './Task.types';


const TaskDelete = ({ task, className }: TaskDeleteProps) => {
    const { isOpen, close, open } = useDisclosure();

    const { trigger: deleteTask, isMutating } = useTaskDelete({ taskId: task.id, columnId: task.columnId }, {
        onSuccess: () => close(),
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
            <Modal isOpen={isOpen} onClose={close}>
                <Modal.Title>
                    Are you sure you want to delete this task!
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
                        onClick={deleteTask}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default TaskDelete;
