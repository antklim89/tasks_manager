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
                    <Menu.Item>
                        {projectId
                            ? <ProjectPanelDelete projectId={projectId} />
                            : null}
                        {(projectId && projectName)
                            ? <ProjectPanelEdit projectId={projectId} projectName={projectName} />
                            : null}
                    </Menu.Item>
                </Menu>
            </div>
        </>
    );
};

export default ProjectPanel;
