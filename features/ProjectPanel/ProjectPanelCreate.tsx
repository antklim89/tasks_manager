'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Button, Input, Modal } from '@/components';
import Alert from '@/components/Alert/Alert';
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
        <Modal
            body={(
                <>
                    <Alert message={error?.message} type="error" />
                    <Input
                        errorMessage={errors.name?.message}
                        placeholder="Project name"
                        {...register('name')}
                    />
                </>
            )}
            renderConfirmButton={(close) => (
                <Button
                    isLoading={isMutating}
                    onClick={() => handleCreate(close)}
                >
                    Create
                </Button>
            )}
            renderOpenButton={(close) => (
                <Button
                    aria-label="delete column"
                    isLoading={isMutating}
                    onClick={close}
                >
                    Create New Project
                </Button>
            )}
            title="Are you sure you want to delete this column!"
        />
    );
};

export default ProjectPanelCreate;
