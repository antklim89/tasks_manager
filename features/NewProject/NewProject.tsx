'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Input } from '@/components';
import Alert from '@/components/Alert/Alert';
import Dialog from '@/components/Dialog/Dialog';
import { useCreateProject } from '@/requests/useCreateProject';

import { NewProjectType, newProjectSchema } from './NewProject.schema';


const NewProject = () => {
    const {
        register,
        formState: { errors },
        reset: resetForm,
        handleSubmit,
    } = useForm<NewProjectType>({ resolver: zodResolver(newProjectSchema) });

    const { trigger: createNewProject, error, isMutating, reset: resetState } = useCreateProject();


    const handleCreate = (close: (() => void)) => handleSubmit(async (data) => {
        try {
            await createNewProject(data);
            resetForm({ }, { keepValues: false });
            resetState();
            close();
        } catch (_) { /** */ }
    });

    return (
        <Dialog
            closeClassName="btn-outline"
            confirmText="confirm"
            isLoading={isMutating}
            openText="New Project"
            title="Create New Project"
            onConfirm={(close) => handleCreate(close)()}
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
