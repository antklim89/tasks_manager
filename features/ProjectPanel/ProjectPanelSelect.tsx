'use client';
import Link from 'next/link';

import { Button } from '@/components';
import { useProjectsFetch } from '@/requests';


const ProjectPanelSelect = ({ projectId }: {projectId?: number}) => {
    const { data: projects, isLoading } = useProjectsFetch();
    const selectedProject = projects?.find((project) => project.id === projectId);

    return (
        <div className="dropdown">
            <Button className="btn-outline" isLoading={isLoading} tabIndex={0}>{selectedProject?.name || 'Select Project'}</Button>
            <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52">
                {projects?.map((project) => (
                    <li key={project.id}><Link href={`/dashboard/${project.id}`}>{project.name}</Link></li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectPanelSelect;
