'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Input from '@/components/Input';
import { TaskCreateType, taskCreateSchema } from '@/schemas';

import { TaskEditFormProps } from './TaskEditForm.types';


const TaskEditForm = ({ onSubmit, children, defaultValues }: TaskEditFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<TaskCreateType>({
        resolver: zodResolver(taskCreateSchema),
        defaultValues,
    });

    const handleCreateTask = handleSubmit(async (data) => {
        await onSubmit?.(data);
        if (!defaultValues) reset({}, { keepValues: false });
    });

    return (
        <form onSubmit={handleCreateTask}>
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
            {children}
        </form>
    );
};

export default TaskEditForm;
