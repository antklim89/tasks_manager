import Link from 'next/link';

import { getServerComponentUser, serverComponentClient } from '@/utils';


const DashboardHome = async () => {
    const user = await getServerComponentUser();
    const { data: projects } = await serverComponentClient()
        .from('projects')
        .select('id, name')
        .eq('owner', user.id);

    return (
        <div>
            <h2 className="text-4xl text-center">{user.email?.split('@')[0]}`s dashboard.</h2>
            <h3>Select your project</h3>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {projects?.map((project) => (
                    <Link className="card bg-base-100 shadow-xl hover:bg-base-200 transition" href={`/dashboard/${project.id}`} key={project.id}>
                        <div className="card-body">
                            <h2 className="card-title">{project.name}</h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default DashboardHome;
