'use client';
import { FaEllipsisVertical } from 'react-icons/fa6';

import { Button, Menu } from '@/components';

import ProjectPanelCreate from './ProjectPanelCreate';
import ProjectPanelDelete from './ProjectPanelDelete';
import ProjectPanelSelect from './ProjectPanelSelect';


const ProjectPanel = ({ projectId }: { projectId?: number }) => {
    return (
        <>
            <div className="flex py-4 bpx-2">
                <ProjectPanelCreate />
                <ProjectPanelSelect projectId={projectId} />
                <div className="flex-grow" />
                <Menu button={<Button aria-label="project menu" color="ghost"><FaEllipsisVertical /></Button>}>
                    {projectId ? <Menu.Item><ProjectPanelDelete projectId={projectId} /></Menu.Item> : null}
                </Menu>
            </div>
        </>
    );
};

export default ProjectPanel;
