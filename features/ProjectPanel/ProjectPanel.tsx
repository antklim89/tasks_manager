'use client';
import Link from 'next/link';
import { FaEllipsisVertical } from 'react-icons/fa6';

import { Button, Menu } from '@/components';
import { useProjectsFetch } from '@/requests';

import ProjectPanelCreate from './ProjectPanelCreate';
import ProjectPanelDelete from './ProjectPanelDelete';
import ProjectPanelSelect from './ProjectPanelSelect';
import ProjectPanelUpdate from './ProjectPanelUpdate';


const ProjectPanel = ({ projectId }: { projectId?: number }) => {
    const { data: projects, isLoading } = useProjectsFetch();
    const project = projects?.find((p) => p.id === projectId);

    if (isLoading) return <div className="flex h-12 my-2 px-2 skeleton" />;
    return (
        <div className="flex h-12 my-2 px-2">
            <ProjectPanelCreate />
            <ProjectPanelSelect projectName={project?.name} projects={projects} />
            <Link className="btn btn-primary" href={`/dashboard/${projectId}/members`}>Members</Link>
            <div className="flex-grow" />
            {project
                ? (
                    <Menu button={<Button aria-label="project menu" color="ghost"><FaEllipsisVertical /></Button>}>
                        <ProjectPanelUpdate project={project} />
                        <ProjectPanelDelete />
                    </Menu>
                )
                : null}
        </div>
    );
};

export default ProjectPanel;
