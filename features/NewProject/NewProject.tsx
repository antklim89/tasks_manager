'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Input } from '@/components';
import Dialog from '@/components/Dialog/Dialog';

import { newProjectSchema } from './NewProject.schema';


const NewProject = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof newProjectSchema>>({ resolver: zodResolver(newProjectSchema) });


    const handleCreate = handleSubmit((data) => {
        console.log('===\n ~ data:', data);
    });

    return (
        <Dialog
            closeClassName="btn-outline"
            confirmText="confirm"
            openText="New Project"
            title="Create New Project"
            onConfirm={() => handleCreate()}
        >
            <Input
                errorMessage={errors.name?.message}
                label="Project name"
                {...register('name')}
            />
        </Dialog>
    );
};

export default NewProject;
