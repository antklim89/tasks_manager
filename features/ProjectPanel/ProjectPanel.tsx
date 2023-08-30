'use client';
import { FaEllipsisVertical } from 'react-icons/fa6';

import { Button, Menu } from '@/components';
import { useProjectsFetch } from '@/requests';

import ProjectPanelDelete from './ProjectPanelDelete';
import ProjectPanelEdit from './ProjectPanelEdit';
import ProjectPanelSelect from './ProjectPanelSelect';


const ProjectPanel = ({ projectId }: { projectId?: number }) => {
    const { data: projects, isLoading } = useProjectsFetch();
    const projectName = projects?.find((project) => project.id === projectId)?.name;

    return (
        <>
            <div className="flex py-4 bpx-2">
                <ProjectPanelEdit />
                <ProjectPanelSelect isLoading={isLoading} projectName={projectName} projects={projects} />
                <div className="flex-grow" />
                <Menu button={<Button aria-label="project menu" color="ghost"><FaEllipsisVertical /></Button>}>
                    {projectId
                        ? <Menu.Item><ProjectPanelDelete projectId={projectId} /></Menu.Item>
                        : null}
                    {(projectId && projectName)
                        ? <Menu.Item><ProjectPanelEdit projectId={projectId} projectName={projectName} /></Menu.Item>
                        : null}
                </Menu>
            </div>
        </>
    );
};

export default ProjectPanel;
