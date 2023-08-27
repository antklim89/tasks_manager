import { useRouter } from 'next/navigation';
import { FaTrash } from 'react-icons/fa6';

import { Button, Modal } from '@/components';
import { useProjectDelete } from '@/requests';
import { useDisclosure } from '@/utils';


const ProjectPanelDelete = ({ projectId }: { projectId: number }) => {
    const { isOpen, close, open } = useDisclosure();

    const { push } = useRouter();

    const { trigger, isMutating } = useProjectDelete({ projectId }, {
        onSuccess() {
            close();
            push('/dashboard');
        },
    });

    const handleDelete = async () => {
        await trigger();
    };

    return (
        <>
            <Button
                aria-label="delete column"
                color="ghost"
                isLoading={isMutating}
                onClick={open}
            >
                <FaTrash />
            </Button>

            <Modal isOpen={isOpen} onClose={close}>
                <Modal.Title>
                    Are you sure you want to delete this column!
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
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ProjectPanelDelete;
