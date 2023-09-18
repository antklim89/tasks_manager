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
                <Button outline className="text-white" key={project.id}>
                    <Link href={`/dashboard/${project.id}`}>{project.name}</Link>
                </Button>
            ))}
        </Menu>
    );
};

export default ProjectPanelSelect;
