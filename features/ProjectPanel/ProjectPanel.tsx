'use client';
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
                {projectId
                    ? (
                        <>
                            <ProjectPanelDelete projectId={projectId} />
                        </>
                    )
                    : null}
            </div>
        </>
    );
};

export default ProjectPanel;
