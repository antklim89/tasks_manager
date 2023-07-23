'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Input } from '@/components';
import Alert from '@/components/Alert/Alert';
import Dialog from '@/components/Dialog/Dialog';
import { useCreateNewProject } from '@/requests/useCreateNewProject';

import { NewProjectType, newProjectSchema } from './NewProject.schema';


const NewProject = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<NewProjectType>({ resolver: zodResolver(newProjectSchema) });

    const { trigger, error } = useCreateNewProject();


    const handleCreate = handleSubmit((data) => {
        trigger(data);
    });

    return (
        <Dialog
            closeClassName="btn-outline"
            confirmText="confirm"
            openText="New Project"
            title="Create New Project"
            onConfirm={() => handleCreate()}
        >
            <Alert message={error?.message} type="error" />
            <Input
                errorMessage={errors.name?.message}
                label="Project name"
                {...register('name')}
            />
        </Dialog>
    );
};

export default NewProject;
