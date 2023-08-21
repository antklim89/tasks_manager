'use client';
import { Button } from '@/components';
import Column from '@/features/Column';
import { useColumnCreate, useColumnsFetch } from '@/requests';


const Project = ({ projectId }: {projectId: number}) => {
    const { trigger: createColumn, isMutating } = useColumnCreate({ projectId });
    const { data: columns = [], isLoading } = useColumnsFetch({ projectId });

    const handleCreateColumn = () => {
        createColumn();
    };

    if (isLoading) return <span className="loading loading-bars loading-lg" />;
    return (
        <div className="flex items-start h-full gap-2 overflow-y-scroll">
            {columns.map((column) => (
                <Column key={column.id} {...column} />
            ))}
            <Button isLoading={isMutating} onClick={handleCreateColumn}>Create new column</Button>
        </div>
    );
};

export default Project;
