import { FaPlus } from 'react-icons/fa6';

import { Button, Modal, TaskEditForm } from '@/components';
import { useColumnSelector, useDisclosure } from '@/hooks';
import { useTaskCreate } from '@/request-hooks';
import { useHistoryCreate } from '@/request-hooks/useHistoryCreate';
import { formatHistoryData } from '@/utils';


const ColumnTaskCreate = () => {
    const columnName = useColumnSelector(column => column.name);
    const { isOpen, close, open } = useDisclosure();
    const { trigger: historyCreate } = useHistoryCreate();

    const { trigger: createTask, isMutating } = useTaskCreate({
        onSuccess: (data) => {
            close();
            const historyData = formatHistoryData({ data, fields: ['description', 'completeAt', 'startAt'], startText: 'with ' });
            historyCreate({ body: `Task "${data.title}" added to column "${columnName}" ${historyData}` });
        },

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
