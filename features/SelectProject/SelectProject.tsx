import Link from 'next/link';

import { Button } from '@/components';
import { serverComponentClient } from '@/utils';


const SelectProject = async ({ projectId }: {projectId?: number}) => {
    const { data } = await serverComponentClient().auth.getSession();

    const { data: projects } = await serverComponentClient().from('projects').select('id, name')
        .eq('owner', data.session?.user.id);
    const selectedProject = projects?.find((project) => project.id === projectId);

    return (
        <div className="dropdown">
            <Button className="btn-outline" tabIndex={0}>{selectedProject?.name || 'Select Project'}</Button>
            <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52">
                {projects?.map((project) => (
                    <li key={project.id}><Link href={`/dashboard/${project.id}`}>{project.name}</Link></li>
                ))}
            </ul>
        </div>
    );
};

export default SelectProject;
