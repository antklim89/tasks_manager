'use client';
import { useRouter } from 'next/navigation';
import { FaPlus } from 'react-icons/fa6';

import { Button, Modal } from '@/components';
import ProjectEditForm from '@/components/ProjectEditForm';
import { useDisclosure } from '@/hooks';
import { useProjectCreate } from '@/request-hooks';
import { ProjectType } from '@/schemas';


const ProjectPanelCreate = () => {
    const { isOpen, close, open } = useDisclosure();
    const { push } = useRouter();

    const { trigger: createNewProject, isMutating: isCreating } = useProjectCreate({
        onSuccess(newProject) {
            close();
            if (Array.isArray(newProject) && newProject.at(-1)) {
                push(`/dashboard/${(newProject.at(-1) as ProjectType).id}`);
            } else push(`/dashboard/${newProject.id}`);
        },
    });

    return (
        <>
            <Button
                aria-label="delete column"
                className="join-item"
                color="primary"
                isLoading={isCreating}
                onClick={open}
            >
                <FaPlus />
            </Button>

            <Modal isOpen={isOpen} onClose={close}>
                <Modal.Title>
                    Creaete Project
                </Modal.Title>
                <Modal.Body>
                    <ProjectEditForm onSubmit={createNewProject}>
                        <Modal.Footer>
                            <Button
                                outline
                                isLoading={isCreating}
                                onClick={close}
                            >
                                Cancel
                            </Button>
                            <Button
                                isLoading={isCreating}
                                type="submit"
                            >
                                Create
                            </Button>
                        </Modal.Footer>
                    </ProjectEditForm>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ProjectPanelCreate;
