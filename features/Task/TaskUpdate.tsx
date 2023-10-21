import { Button, Modal, TaskEditForm } from '@/components';
import { TaskType } from '@/schemas';
import { useTaskUpdate } from '@/request-hooks';

import TaskDelete from './TaskDelete';


const TaskUpdate = ({ task, close, isOpen }: { task: TaskType, isOpen: boolean, close: () => void }) => {
    const { trigger: updateTask, isMutating } = useTaskUpdate({ columnId: task.columnId, taskId: task.id }, {
        onSuccess: () => close(),
    });

    return (
        <Modal isOpen={isOpen} size="2xl" onClose={close}>
            <Modal.Title className="text-2xl">
                {task.title}
            </Modal.Title>
            <TaskEditForm defaultValues={task} onSubmit={updateTask}>
                <Modal.Footer>
                    <TaskDelete className="w-auto btn-error" task={task} />
                    <Button isLoading={isMutating} type="submit">Update</Button>
                    <Button outline isLoading={isMutating} onClick={close}>Cancel</Button>
                </Modal.Footer>
            </TaskEditForm>
        </Modal>
    );
};

export default TaskUpdate;
