import { useRouter } from 'next/navigation';

import { Dialog } from '@/components';
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
        <Dialog
            closeText="CANCEL"
            confirmClassName="btn-error"
            confirmText="DELETE"
            isLoading={isMutating}
            openClassName="btn-error"
            openText="DELETE"
            onConfirm={handleDelete}
        >
            Are you sure you want to delete this project!
        </Dialog>
    );
};

export default ProjectPanelDelete;
