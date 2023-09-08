import { Modal, Button, DateComponent } from '@/components';
import { TaskType } from '@/schemas';

import TaskDelete from './TaskDelete';
import TaskUpdate from './TaskUpdate';


const TaskFull = ({ task, close, isOpen }: { task: TaskType, isOpen: boolean, close: () => void }) => {
    return (
        <Modal isOpen={isOpen} size="2xl" onClose={close}>
            <Modal.Title className="text-2xl">
                {task.title}
            </Modal.Title>
            <Modal.Body>
                <p className="p-1 mb-2">
                    {task.description}
                </p>

                <p><span className="font-bold">Created at: </span><DateComponent date={task.createdAt} /></p>
                <p><span className="font-bold">Complete at: </span><DateComponent date={task.createdAt} /></p>
            </Modal.Body>
            <Modal.Footer>
                <TaskDelete className="w-auto btn-error" task={task} />
                <TaskUpdate className="w-auto btn-primary" task={task} />
                <Button onClick={close}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TaskFull;
