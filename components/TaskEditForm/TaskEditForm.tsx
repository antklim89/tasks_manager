'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import { DatePicker } from '@/components';
import Input from '@/components/Input';
import { TaskCreateType, taskCreateSchema } from '@/schemas';

import { TaskEditFormProps } from './TaskEditForm.types';


const TaskEditForm = ({ onSubmit, children, defaultValues }: TaskEditFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
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
                as="textarea"
                {...register('description')}
                errorMessage={errors.description?.message}
                label="Description"
                rows={7}
            />
            <Controller
                control={control}
                name="startAt"
                render={({ field }) => (
                    <DatePicker
                        customInput={<Input className="w-full" errorMessage={errors.completeAt?.message} label="Start at" />}
                        value={field.value}
                        onChange={(date) => field.onChange(date?.toISOString())}
                    />
                )}
            />
            <Controller
                control={control}
                name="completeAt"
                render={({ field }) => (
                    <DatePicker
                        customInput={<Input className="w-full" errorMessage={errors.completeAt?.message} label="Complete at" />}
                        value={field.value}
                        onChange={(date) => field.onChange(date?.toISOString())}
                    />
                )}
            />
            {children}
        </form>
    );
};

export default TaskEditForm;
