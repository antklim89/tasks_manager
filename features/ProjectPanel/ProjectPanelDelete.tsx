import { useRouter } from 'next/navigation';
import { FaTrash } from 'react-icons/fa6';

import { Button, Modal } from '@/components';
import { useProjectDelete } from '@/requests';


const ProjectPanelDelete = ({ projectId }: { projectId: number }) => {
    const { push } = useRouter();
    const { trigger, isMutating } = useProjectDelete({ projectId }, {
        onSuccess() {
            push('/dashboard');
        },
    });

    const handleDelete = async (close: () => void) => {
        await trigger().catch(() => null).then(() => close());
    };

    return (
        <Modal
            renderCloseButton={(close) => (
                <Button
                    outline
                    isLoading={isMutating}
                    size="sm"
                    onClick={close}
                >
                    Cancel
                </Button>
            )}
            renderConfirmButton={(close) => (
                <Button
                    color="error"
                    isLoading={isMutating}
                    size="sm"
                    onClick={() => handleDelete(close)}
                >
                    Delete
                </Button>
            )}
            renderOpenButton={(close) => (
                <Button
                    aria-label="delete column"
                    color="ghost"
                    isLoading={isMutating}
                    onClick={close}
                >
                    <FaTrash />
                </Button>
            )}
            title="Are you sure you want to delete this column!"
        />
    );
};

export default ProjectPanelDelete;
