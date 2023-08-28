'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Button, Input, Modal } from '@/components';
import Alert from '@/components/Alert/Alert';
import { useProjectCreate } from '@/requests';
import { useDisclosure } from '@/utils';

import { ProjectCreateType, projectCreateSchema } from './ProjectPanel.schema';


const ProjectPanelCreate = () => {
    const { isOpen, close, open } = useDisclosure();

    const { push } = useRouter();

    const {
        register,
        formState: { errors },
        reset: resetForm,
        handleSubmit,
    } = useForm<ProjectCreateType>({ resolver: zodResolver(projectCreateSchema) });

    const { trigger: createNewProject, error, isMutating, reset: resetState } = useProjectCreate({
        onSuccess(newProject) {
            close();
            resetForm({ }, { keepValues: false });
            resetState();
            if (Array.isArray(newProject) && newProject.at(-1)) push(`dashboard/${newProject.at(-1).id}`);
            else push(`dashboard/${newProject.id}`);
        },
    });

    const handleCreate = () => handleSubmit((data) => {
        createNewProject(data);
    });

    return (
        <>
            <Button
                aria-label="delete column"
                isLoading={isMutating}
                onClick={open}
            >
                New Project
            </Button>

            <Modal isOpen={isOpen} onClose={close}>
                <Modal.Title>
                    Creaete Project
                </Modal.Title>
                <Modal.Body>
                    <Alert message={error?.message} type="error" />
                    <Input
                        errorMessage={errors.name?.message}
                        placeholder="Project name"
                        {...register('name')}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        outline
                        isLoading={isMutating}
                        onClick={close}
                    >
                        Cancel
                    </Button>
                    <Button
                        isLoading={isMutating}
                        onClick={handleCreate}
                    >
                        Create
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ProjectPanelCreate;
