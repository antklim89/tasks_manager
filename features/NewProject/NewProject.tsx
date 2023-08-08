'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Input } from '@/components';
import Alert from '@/components/Alert/Alert';
import Dialog from '@/components/Dialog/Dialog';
import { useProjectCreate } from '@/requests';

import { NewProjectType, newProjectSchema } from './NewProject.schema';


const NewProject = () => {
    const {
        register,
        formState: { errors },
        reset: resetForm,
        handleSubmit,
    } = useForm<NewProjectType>({ resolver: zodResolver(newProjectSchema) });

    const { trigger: createNewProject, error, isMutating, reset: resetState } = useProjectCreate();

    const handleCreate = (close: (() => void)) => handleSubmit((data) => {
        createNewProject(data)
            .catch(() => null)
            .then(() => {
                resetForm({ }, { keepValues: false });
                resetState();
                close();
            });
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
