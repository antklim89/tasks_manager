import { Button } from '@/components';
import { useMember } from '@/hooks';
import { useHistoryCreate, useColumnCreate } from '@/request-hooks';


const ProjectCreateColumn = () => {
    const { isAdmin } = useMember();
    
    const { trigger: historyCreate } = useHistoryCreate();

    const { trigger: createColumn, isMutating } = useColumnCreate({
        onSuccess() {
            historyCreate({ body: 'New column created' });
        },
    });

    if (!isAdmin) return null;
    return (
        <Button isLoading={isMutating} onClick={() => createColumn()}>Create new column</Button>
    );
};

export default ProjectCreateColumn;
