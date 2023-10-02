'use client';
import Link from 'next/link';
import { FaEllipsisVertical } from 'react-icons/fa6';

import { Button, Menu } from '@/components';
import { useMember, useProject } from '@/hooks';
import { useProjectsFetch } from '@/requests';

import ProjectPanelCreate from './ProjectPanelCreate';
import ProjectPanelDelete from './ProjectPanelDelete';
import ProjectPanelSelect from './ProjectPanelSelect';
import ProjectPanelUpdate from './ProjectPanelUpdate';


const ProjectPanel = () => {
    const { projectId } = useProject(false);
    const { data: projects, isLoading } = useProjectsFetch();
    const { isAdmin, member } = useMember();
    const project = projects?.find((p) => p.id === projectId);

    if (isLoading) return <div className="flex h-12 my-2 px-2 skeleton" />;
    return (
        <div className="flex h-12 my-2 px-2 items-center">
            <ProjectPanelCreate />
            <ProjectPanelSelect projectName={project?.name} projects={projects} />
            {projectId ? <Link className="btn btn-primary" href={`/dashboard/${projectId}/members`}>Members</Link> : null}
            <div className="flex-grow" />
            {(isAdmin && project)
                ? (
                    <Menu button={<Button aria-label="project menu" color="ghost"><FaEllipsisVertical /></Button>}>
                        {member ? <p className="text-md mb-4 text-center uppercase">{member.role}</p> : null}
                        <ProjectPanelUpdate project={project} />
                        <ProjectPanelDelete />
                    </Menu>
                )
                : null}

        </div>
    );
};

export default ProjectPanel;
