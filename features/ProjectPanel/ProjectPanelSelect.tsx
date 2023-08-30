'use client';
import Link from 'next/link';

import { Button } from '@/components';
import { ProjectType } from '@/schemas';


const ProjectPanelSelect = ({
    projects,
    isLoading,
    projectName = 'Select Project',
}: {
    projectName?: string,
    projects?: ProjectType[],
    isLoading: boolean
}) => {
    return (
        <div className="dropdown">
            <Button outline isLoading={isLoading} tabIndex={0}>{projectName}</Button>
            <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52">
                {projects?.map((project) => (
                    <li key={project.id}><Link href={`/dashboard/${project.id}`}>{project.name}</Link></li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectPanelSelect;
