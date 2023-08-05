'use client';
import { Button } from '@/components';
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
                <div className="flex flex-col basis-64 p-2 font-bold shrink-0 bg-slate-300 text-black rounded-md" key={column.id}>
                    {column.name}
                </div>
            ))}
            <Button disabled={isMutating} onClick={handleCreateColumn}>Create new column</Button>
        </div>
    );
};

export default Project;
