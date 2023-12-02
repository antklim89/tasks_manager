'use client';

import { ProjectEditForm, Button, Modal } from '@/components';
import { useDisclosure } from '@/hooks';
import { useHistoryCreate, useProjectUpdate } from '@/request-hooks';
import { ProjectType } from '@/schemas';
import { formatHistoryData } from '@/utils';


const ProjectPanelUpdate = ({ project }: { project: ProjectType }) => {
    const { isOpen, close, open } = useDisclosure();
    const { trigger: historyCreate } = useHistoryCreate();

    const { trigger: updateProject, isMutating: isUpdating } = useProjectUpdate({ id: project.id }, {
        onSuccess(data) {
            close();
            historyCreate({ body: `Project "${project.name}" updated ${formatHistoryData({ data, startText: 'with' })}` });
        },
    });

    return (
        <>
            <Button
                aria-label="delete column"
                color="ghost"
                isLoading={isUpdating}
                onClick={open}
            >
                Update
            </Button>

            <Modal isOpen={isOpen} onClose={close}>
                <Modal.Title>
                    Update Project
                </Modal.Title>
                <Modal.Body>
                    <ProjectEditForm defaultValues={project} onSubmit={updateProject}>
                        <Modal.Footer>
                            <Button
                                outline
                                isLoading={isUpdating}
                                onClick={close}
                            >
                                Cancel
                            </Button>
                            <Button
                                isLoading={isUpdating}
                                type="submit"
                            >
                                Update
                            </Button>
                        </Modal.Footer>
                    </ProjectEditForm>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ProjectPanelUpdate;
