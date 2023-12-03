'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import { Button, DatePicker } from '@/components';
import Input from '@/components/ui/Input';
import { priorities } from '@/constants';
import { useTask } from '@/hooks';
import { useColumnsFetch } from '@/request-hooks';
import { TaskCreateType, taskCreateSchema } from '@/schemas';
import { cn } from '@/utils';

import { TaskEditFormProps } from './TaskEditForm.types';


const TaskEditForm = ({ onSubmit, children }: TaskEditFormProps) => {
    const task = useTask(false);
    const { data: columns } = useColumnsFetch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        resetField,
        control,
    } = useForm<TaskCreateType>({
        resolver: zodResolver(taskCreateSchema),
        defaultValues: task || undefined,
    });

    const handleCreateTask = handleSubmit(async (data) => {
        await onSubmit?.(data);
        if (!task) reset({}, { keepValues: false });
    });
    
    return (
        <form onSubmit={handleCreateTask}>
            <div className="flex flex-col gap-2 mb-4">
                <Input
                    {...register('columnId')}
                    as="select"
                    errorMessage={errors.columnId?.message}
                    label="Column"
                >
                    {columns?.map(column => (
                        <option key={column.id} value={column.id}>{column.name}</option>
                    ))}
                </Input>
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
                    name="color"
                    render={({ field }) => (
                        <div>
                            <span className="label-text">Colors: </span>
                            <div className='grid grid-cols-2 sm:grid-cols-4 gap-2'>
                                {priorities.map(priority => (
                                    <Button
                                        className={cn('bg-transparent btn-sm sm:btn-md', { 'bg-primary': field.value === priority })} 
                                        key={priority}
                                        onClick={() => field.onChange(priority)}
                                    >
                                        {priority}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}
                />
                <Controller
                    control={control}
                    name="priority"
                    render={({ field }) => (
                        <div>
                            <span className="label-text">Priorities: </span>
                            <div className='grid grid-cols-2 sm:grid-cols-4 gap-2'>
                                {priorities.map(priority => (
                                    <Button
                                        className={cn('bg-transparent btn-sm sm:btn-md', { 'bg-primary': field.value === priority })} 
                                        key={priority}
                                        onClick={() => field.onChange(priority)}
                                    >
                                        {priority}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}
                />
                <Controller
                    control={control}
                    name="startAt"
                    render={({ field }) => (
                        <DatePicker
                            customInput={(
                                <Input
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
