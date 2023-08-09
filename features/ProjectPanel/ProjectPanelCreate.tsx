'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Input } from '@/components';
import Alert from '@/components/Alert/Alert';
import Dialog from '@/components/Dialog/Dialog';
import { useProjectCreate } from '@/requests';

import { ProjectCreateType, projectCreateSchema } from './ProjectPanel.schema';


const ProjectPanelCreate = () => {
    const { push } = useRouter();
    const {
        register,
        formState: { errors },
        reset: resetForm,
        handleSubmit,
    } = useForm<ProjectCreateType>({ resolver: zodResolver(projectCreateSchema) });

    const { trigger: createNewProject, error, isMutating, reset: resetState } = useProjectCreate({
        onSuccess(newProject) {
            resetForm({ }, { keepValues: false });
            resetState();
            if (Array.isArray(newProject) && newProject.at(-1)) push(`dashboard/${newProject.at(-1).id}`);
            else push(`dashboard/${newProject.id}`);
        },
    });

    const handleCreate = (close: (() => void)) => handleSubmit((data) => {
        createNewProject(data).catch(() => null).then(() => close());
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

export default ProjectPanelCreate;
