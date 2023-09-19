import { FaPlus } from 'react-icons/fa6';

import { Button, Modal, TaskEditForm } from '@/components';
import { useDisclosure } from '@/hooks';
import { useTaskCreate } from '@/requests';


const ColumnTaskCreate = ({ columnId }: { columnId: number; }) => {
    const { isOpen, close, open } = useDisclosure();

    const { trigger: createTask, isMutating } = useTaskCreate({ columnId }, {
        onSuccess: () => close(),
    });

    return (
        <>
            <Button aria-label="add new task" isLoading={isMutating} onClick={open}><FaPlus /></Button>

            <Modal isOpen={isOpen} size="2xl" onClose={close}>
                <Modal.Body>
                    <TaskEditForm onSubmit={createTask}>
                        <Modal.Footer>
                            <Button outline isLoading={isMutating} onClick={close}>Cancel</Button>
                            <Button isLoading={isMutating} type="submit">Create</Button>
                        </Modal.Footer>
                    </TaskEditForm>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ColumnTaskCreate;
