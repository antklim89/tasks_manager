import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa6';

import { Button, Input, Modal } from '@/components';
import { useTaskCreate } from '@/requests';
import { TaskCreateType, taskCreateSchema } from '@/schemas';


const ColumnTaskCreate = ({ columnId }: { columnId: number; }) => {
    const { trigger: createTask, isMutating } = useTaskCreate({ columnId });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TaskCreateType>({
        resolver: zodResolver(taskCreateSchema),
    });

    const handleCreateTask = (close: (() => void)) => handleSubmit((data) => {
        createTask(data).catch(console.error).then(close);
    });

    return (
        <Modal
            body={(
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
            )}
            renderConfirmButton={(close) => (
                <Button isLoading={isMutating} onClick={(e) => handleCreateTask(close)(e)}>Create</Button>
            )}
            renderOpenButton={(open) => (
                <Button aria-label="add new task" isLoading={isMutating} onClick={open}><FaPlus /></Button>
            )}
        />
    );
};

export default ColumnTaskCreate;
