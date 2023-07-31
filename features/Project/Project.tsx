'use client';
import { Button } from '@/components';
import { useCreateColumn } from '@/requests';


const Project = ({ projectId }: {projectId: number}) => {
    const { trigger: createColumn, isMutating } = useCreateColumn();

    const handleCreateColumn = () => {
        createColumn({ projectId });
    };

    return (
        <div>
            <Button disabled={isMutating} onClick={handleCreateColumn}>Create new column</Button>
        </div>
    );
};

export default Project;
