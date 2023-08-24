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
        <div className="flex flex-grow items-start gap-2 overflow-x-scroll overflow-y-hidden">
            {columns.map((column) => (
                <Column key={column.id} {...column} />
            ))}
            <Button isLoading={isMutating} onClick={handleCreateColumn}>Create new column</Button>
        </div>
    );
};

export default Project;
