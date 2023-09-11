'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';

import Input from '@/components/Input';
import { TaskCreateType, taskCreateSchema } from '@/schemas';

import { TaskEditFormProps } from './TaskEditForm.types';
import 'react-datepicker/dist/react-datepicker.css';


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
                {...register('description')}
                errorMessage={errors.description?.message}
                label="Description"
            />
            <Controller
                control={control}
                name="completeAt"
                render={({ field }) => (
                    <DatePicker
                        showTimeSelect
                        className="w-full "
                        customInput={<Input className="w-full" errorMessage={errors.completeAt?.message} label="Complete at" />}
                        dateFormat="dd-MMM-yyyy HH:mm"
                        selected={field.value ? new Date(field.value) : null}
                        timeFormat="HH:mm"
                        timeIntervals={10}
                        wrapperClassName="w-full"
                        onChange={(date) => field.onChange(date?.toISOString() || null)}
                    />
                )}
            />
            {children}
        </form>
    );
};

export default TaskEditForm;
