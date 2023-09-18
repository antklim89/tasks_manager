'use client';
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

    return (
        <>
            <div className="flex py-4 bpx-2">
                <ProjectPanelCreate />
                <ProjectPanelSelect isLoading={isLoading} projectName={project?.name} projects={projects} />
                <div className="flex-grow" />
                <Menu button={<Button aria-label="project menu" color="ghost"><FaEllipsisVertical /></Button>}>
                    {project ? <ProjectPanelDelete projectId={project.id} /> : null}
                    {project ? <ProjectPanelUpdate project={project} /> : null}
                </Menu>
            </div>
        </>
    );
};

export default ProjectPanel;
