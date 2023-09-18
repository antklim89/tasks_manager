import { useRouter } from 'next/navigation';

import { Button, Confirm } from '@/components';
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
                Delete
            </Button>
            <Confirm
                confirmButtonText="Delete"
                isLoading={isMutating}
                isOpen={isOpen}
                text="Are you sure you want to delete this project!"
                onClose={close}
                onConfirm={deleteProject}
            />
        </>
    );
};

export default ProjectPanelDelete;
