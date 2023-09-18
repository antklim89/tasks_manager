'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Input from '@/components/Input';
import { ProjectUpdateType, projectUpdateSchema } from '@/schemas';

import { ProjectEditFormProps } from './ProjectEditForm.types';


const ProjectEditForm = ({ onSubmit, children, defaultValues }: ProjectEditFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        resetField,
    } = useForm<ProjectUpdateType>({
        resolver: zodResolver(projectUpdateSchema),
        defaultValues,
    });

    const handleCreateTask = handleSubmit(async (data) => {
        await onSubmit?.(data);
        if (!defaultValues) reset({}, { keepValues: false });
    });
    return (
        <form onSubmit={handleCreateTask}>
            <Input
                {...register('name')}
                errorMessage={errors.name?.message}
                label="Title"
            />
            <Input
                as="textarea"
                {...register('description')}
                errorMessage={errors.description?.message}
                label="Description"
                reset={() => resetField('description', { defaultValue: '' })}
                rows={7}
            />
            {children}
        </form>
    );
};

export default ProjectEditForm;
