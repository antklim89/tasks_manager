'use client';
import { Button } from '@/components';
import Column from '@/features/Column';
import { useCreateColumn, useFetchColumns } from '@/requests';


const Project = ({ projectId }: {projectId: number}) => {
    const { trigger: createColumn, isMutating } = useCreateColumn();
    const { data: columns = [], isLoading } = useFetchColumns({ projectId });

    const handleCreateColumn = () => {
        createColumn({ projectId });
    };

    if (isLoading) return <span className="loading loading-bars loading-lg" />;
    return (
        <div className="flex gap-2">
            {columns.map((column) => (
                <Column key={column.id} {...column} />
            ))}
            <Button isLoading={isMutating} onClick={handleCreateColumn}>Create new column</Button>
        </div>
    );
};

export default Project;
