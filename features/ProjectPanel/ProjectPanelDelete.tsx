import { useRouter } from 'next/navigation';

import { Button, Modal } from '@/components';
import { useProjectDelete } from '@/requests';
import { useDisclosure } from '@/utils';


const ProjectPanelDelete = ({ projectId }: { projectId: number }) => {
    const { isOpen, close, open } = useDisclosure();

    const { push } = useRouter();

    const { trigger: deleteProject, isMutating } = useProjectDelete({ projectId }, {
        onSuccess() {
            close();
            push('/dashboard');
        },
    });


    return (
        <>
            <Button
                aria-label="delete column"
                color="ghost"
                isLoading={isMutating}
                onClick={open}
            >
                Delete Project
            </Button>

            <Modal isOpen={isOpen} onClose={close}>
                <Modal.Title>
                    Are you sure you want to delete this project!
                </Modal.Title>
                <Modal.Footer>
                    <Button
                        outline
                        isLoading={isMutating}
                        size="sm"
                        onClick={close}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="error"
                        isLoading={isMutating}
                        size="sm"
                        onClick={() => deleteProject()}
                    >
                        Delete
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ProjectPanelDelete;
