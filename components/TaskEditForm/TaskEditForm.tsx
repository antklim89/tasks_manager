'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';

import Input from '@/components/Input';
import { TaskCreateType, taskCreateSchema } from '@/schemas';
import { cn } from '@/utils';

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
            <div className="form-control">
                <label className="label" htmlFor="task-description-edit-input">
                    <span className="label-text">Description</span>
                </label>
                <textarea
                    id="task-description-edit-input"
                    {...register('description')}
                    className={cn('input h-auto placeholder:opacity-30 input-bordered resize-none p-4', { 'input-error': errors.description?.message })}
                    rows={10}
                />
                <span className="text-sm text-right text-error">{errors.description?.message}&nbsp;</span>
            </div>
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
