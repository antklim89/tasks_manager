import { useRouter } from 'next/navigation';

import { Button, Confirm } from '@/components';
import { useDisclosure } from '@/hooks';
import { useProjectDelete } from '@/requests';


const ProjectPanelDelete = () => {
    const { isOpen, close, open } = useDisclosure();

    const { push } = useRouter();

    const { trigger: deleteProject, isMutating } = useProjectDelete({
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
