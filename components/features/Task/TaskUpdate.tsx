import { Button, Modal, TaskEditForm } from '@/components';
import { useTask } from '@/hooks';
import { useHistoryCreate, useTaskUpdate } from '@/request-hooks';
import { formatHistoryData } from '@/utils';

import type { TaskUpdateProps } from './Task.types';
import TaskDelete from './TaskDelete';


const TaskUpdate = ({ close, isOpen }: TaskUpdateProps) => {
    const { trigger: historyCreate } = useHistoryCreate();
    const task = useTask();
    
    const { trigger: updateTask, isMutating } = useTaskUpdate({
        onSuccess(data) {
            close();
            const historyData = formatHistoryData({ data, oldData: task, fields: ['title', 'description', 'completeAt', 'startAt'], startText: 'with ' });
            historyCreate({ body: `Task "${task.title}" updated ${historyData}` });
        },
    });

    return (
        <Modal isOpen={isOpen} size="2xl" onClose={close}>
            <Modal.Title className="text-2xl">
                {task.title}
                <br />
                {task?.creator?.email ? <span>added by {task.creator.email}</span> : null}
            </Modal.Title>
            <Modal.Body>
                <TaskEditForm onSubmit={updateTask}>
                    <Modal.Footer>
                        <TaskDelete className="w-auto btn-error" />
                        <Button isLoading={isMutating} type="submit">Update</Button>
                        <Button outline isLoading={isMutating} onClick={close}>Cancel</Button>
                    </Modal.Footer>
                </TaskEditForm>
            </Modal.Body>
        </Modal>
    );
};

export default TaskUpdate;
