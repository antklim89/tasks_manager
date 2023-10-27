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
        resetField,
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
            <div className="mb-4">
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
                    reset={() => resetField('description', { defaultValue: '' })}
                    rows={7}
                />
                <Controller
                    control={control}
                    name="startAt"
                    render={({ field }) => (
                        <DatePicker
                            customInput={(
                                <Input
                                    className="w-full"
                                    errorMessage={errors.completeAt?.message}
                                    label="Start at"
                                    reset={() => resetField('startAt', { defaultValue: null })}
                                />
                            )}
                            selected={field.value ? new Date(field.value) : null}
                            onChange={(date) => field.onChange(date?.toISOString())}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="completeAt"
                    render={({ field }) => (
                        <DatePicker
                            customInput={(
                                <Input
                                    className="w-full"
                                    errorMessage={errors.completeAt?.message}
                                    label="Complete at"
                                    reset={() => resetField('completeAt', { defaultValue: null })}
                                />
                            )}
                            selected={field.value ? new Date(field.value) : null}
                            onChange={(date) => field.onChange(date?.toISOString())}
                        />
                    )}
                />
            </div>
            {children}
        </form>
    );
};

export default TaskEditForm;
