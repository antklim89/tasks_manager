import React from 'react';

import { Button, Modal } from '@/components';
import { useTaskDelete } from '@/requests';
import { useDisclosure } from '@/utils';


const TaskDelete = ({ id, columnId }: { id: number, columnId: number }) => {
    const { isOpen, close, open } = useDisclosure();

    const { trigger: deleteTask, isMutating } = useTaskDelete({ taskId: id, columnId }, {
        onSuccess: () => close(),
    });

    return (
        <>
            <Button
                aria-label="delete column"
                className="w-full"
                color="ghost"
                isLoading={isMutating}
                onClick={open}
            >
                Delete Task
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
