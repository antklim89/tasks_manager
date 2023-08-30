'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Button, Input, Modal } from '@/components';
import { useProjectCreate, useProjectUpdate } from '@/requests';
import { useDisclosure } from '@/utils';

import { ProjectCreateType, projectCreateSchema } from './ProjectPanel.schema';


const ProjectPanelEdit = ({ projectId, projectName }: { projectId?: number, projectName?: string }) => {
    const { isOpen, close, open } = useDisclosure();
    const { push } = useRouter();

    const {
        register,
        formState: { errors },
        reset: resetForm,
        handleSubmit,
    } = useForm<ProjectCreateType>({
        resolver: zodResolver(projectCreateSchema),
        defaultValues: { name: projectName || '' },
    });

    const { trigger: createNewProject, isMutating: isCreating, reset: resetState } = useProjectCreate({
        onSuccess(newProject) {
            close();
            resetForm({ }, { keepValues: false });
            resetState();
            if (Array.isArray(newProject) && newProject.at(-1)) push(`/dashboard/${newProject.at(-1).id}`);
            else push(`/dashboard/${newProject.id}`);
        },
    });

    const { trigger: updateProject, isMutating: isUpdating } = useProjectUpdate({ id: projectId }, {
        onSuccess() {
            close();
        },
    });

    const handleCreate = handleSubmit((data) => {
        if (projectId) updateProject(data);
        else createNewProject(data);
    });

    return (
        <>
            <Button
                aria-label="delete column"
                color={projectId ? 'ghost' : 'primary'}
                isLoading={isCreating || isUpdating}
                onClick={open}
            >
                {projectId ? 'Edit Project' : 'New Project'}
            </Button>

            <Modal isOpen={isOpen} onClose={close}>
                <Modal.Title>
                    {projectId ? 'Edit porject' : 'Creaete Project'}
                </Modal.Title>
                <Modal.Body>
                    <Input
                        errorMessage={errors.name?.message}
                        placeholder="Project name"
                        {...register('name')}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        outline
                        isLoading={isCreating || isUpdating}
                        onClick={close}
                    >
                        Cancel
                    </Button>
                    <Button
                        isLoading={isCreating || isUpdating}
                        onClick={handleCreate}
                    >
                        {projectId ? 'Update' : 'Create'}
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ProjectPanelEdit;
