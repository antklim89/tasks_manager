'use client';
import Link from 'next/link';

import { Button, Menu } from '@/components';
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
        <Menu button={<Button outline isLoading={isLoading} tabIndex={0}>{projectName}</Button>}>
            {projects?.map((project) => (
                <Link
                    className="btn btn-primary btn-outline w-full"
                    href={`/dashboard/${project.id}`}
                    key={project.id}
                >
                    {project.name}
                </Link>
            ))}
        </Menu>
    );
};

export default ProjectPanelSelect;
