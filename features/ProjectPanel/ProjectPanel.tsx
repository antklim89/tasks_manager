import { DashboardHome, Project } from '@/features';

import ProjectPanelCreate from './ProjectPanelCreate';
import ProjectPanelSelect from './ProjectPanelSelect';


const ProjectPanel = ({ projectId }: { projectId?: number }) => {
    return (
        <>
            <div className="flex py-4 bpx-2">
                <ProjectPanelCreate />
                <ProjectPanelSelect projectId={projectId} />
                {projectId
                    ? (
                        <>
                            <div>DELETE</div>
                        </>
                    )
                    : null}
            </div>
            { projectId ? <Project projectId={projectId} /> : <DashboardHome /> }
        </>
    );
};

export default ProjectPanel;
