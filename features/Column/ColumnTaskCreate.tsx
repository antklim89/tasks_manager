import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa6';

import { Button, Input, Modal } from '@/components';
import { useTaskCreate } from '@/requests';
import { TaskCreateType, taskCreateSchema } from '@/schemas';
import { useDisclosure } from '@/utils';


const ColumnTaskCreate = ({ columnId }: { columnId: number; }) => {
    const { isOpen, close, open } = useDisclosure();

    const { trigger: createTask, isMutating } = useTaskCreate({ columnId }, {
        onSuccess() {
            close();
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TaskCreateType>({
        resolver: zodResolver(taskCreateSchema),
    });

    const handleCreateTask = handleSubmit((data) => {
        createTask(data);
    });

    return (
        <>
            <Button aria-label="add new task" isLoading={isMutating} onClick={open}><FaPlus /></Button>

            <Modal isOpen={isOpen} onClose={close}>
                <Modal.Body>
                    <form>
                        <Input
                            {...register('title')}
                            errorMessage={errors.title?.message}
                            label="Title"
                        />
                        <Input
                            {...register('description')}
                            errorMessage={errors.description?.message}
                            label="Description"
                        />
                        <Input
                            {...register('completeAt')}
                            errorMessage={errors.completeAt?.message}
                            label="Complete at"
                            type="datetime-local"
                        />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button outline isLoading={isMutating} onClick={close}>Cancel</Button>
                    <Button isLoading={isMutating} onClick={handleCreateTask}>Create</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ColumnTaskCreate;
