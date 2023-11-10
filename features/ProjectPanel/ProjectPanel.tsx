'use client';
import Link from 'next/link';
import { FaEllipsisVertical } from 'react-icons/fa6';

import { Button, Menu } from '@/components';
import { useMember, useProjectSelector }from '@/hooks';
import { useProjectsFetch } from '@/request-hooks';
import { ProjectType } from '@/schemas';

import ProjectPanelCreate from './ProjectPanelCreate';
import ProjectPanelDelete from './ProjectPanelDelete';
import ProjectPanelSelect from './ProjectPanelSelect';
import ProjectPanelUpdate from './ProjectPanelUpdate';


const ProjectPanel = ({ defaultProjects }: { defaultProjects?: ProjectType[] }) => {
    const projectId = useProjectSelector((project) => project.id, false);
    const { data: projects, isLoading } = useProjectsFetch({ defaultValue: defaultProjects });
    const { isAdmin, member } = useMember(false);
    const project = projects?.find((p) => p.id === projectId);

    if (isLoading) return (
        <div className="flex gap-2 h-12 my-2 px-2 items-center">
            <div className="skeleton btn w-40" />
            <div className="skeleton btn w-24 hidden sm:inline-flex" />
            <div className="skeleton btn w-24 hidden sm:inline-flex" />
            <div className="flex-grow" />
            <div className="skeleton btn w-2" />
        </div>
    );
    return (
        <div className="flex gap-2 h-12 my-2 px-2 items-center">

            <div className="join">
                <ProjectPanelCreate />
                <ProjectPanelSelect project={project} projects={projects} />
            </div>

            {projectId ? <Link className="btn btn-primary hidden sm:inline-flex" href={`/dashboard/${projectId}/members`}>Members</Link> : null}
            {projectId ? <Link className="btn btn-primary hidden sm:inline-flex" href={`/dashboard/${projectId}/history`}>History</Link> : null}

            <div className="flex-grow" />
            {project
                ? (
                    <Menu button={<Button aria-label="project menu" color="ghost"><FaEllipsisVertical /></Button>}>
                        {member ? <p className="text-md mb-4 text-center uppercase">{member.role}</p> : null}
                        <Link className="btn btn-ghost sm:hidden" href={`/dashboard/${projectId}/members`}>Members</Link>
                        <Link className="btn btn-ghost sm:hidden" href={`/dashboard/${projectId}/history`}>History</Link>
                        {isAdmin ? <ProjectPanelUpdate project={project} /> : null}
                        {isAdmin ? <ProjectPanelDelete /> : null}
                    </Menu>
                )
                : null}
        </div>
    );
};

export default ProjectPanel;
