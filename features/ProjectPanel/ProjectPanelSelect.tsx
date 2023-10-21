import Link from 'next/link';
import { FaChevronDown } from 'react-icons/fa6';

import { Button, Menu } from '@/components';
import { ProjectType } from '@/schemas';


const ProjectPanelSelect = ({
    projects,
    project,
}: {
    projects?: ProjectType[],
    project?: ProjectType,
}) => {
    const projectName = project?.name || 'Select Project';

    if (!projects || projects.length === 0) return null;
    return (
        <div className="join join-item">
            <Link className="btn btn-primary btn-outline join-item" href={`/dashboard/${project?.id || ''}`}>{projectName}</Link>
            <Menu button={<Button aria-label="show projects" className="px-2" tabIndex={0}><FaChevronDown /></Button>} className="join-item">
                {projects.map((p) => (
                    <Link
                        className="btn btn-primary btn-outline w-full"
                        href={`/dashboard/${p.id}`}
                        key={p.id}
                    >
                        {p.name}
                    </Link>
                ))}
            </Menu>
        </div>
    );
};

export default ProjectPanelSelect;
