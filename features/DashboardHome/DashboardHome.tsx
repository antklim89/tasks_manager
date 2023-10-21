'use client';
import Link from 'next/link';

import { useProjectsFetch } from '@/request-hooks';


const DashboardHome = () => {
    const { data: projects, isLoading } = useProjectsFetch();

    return (
        <div>
            <h2 className="text-4xl text-center">Dashboard</h2>
            <h3>Select your project</h3>
            {isLoading ? <span className="loading loading-bars loading-lg" /> : null}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {projects?.map((project) => (
                    <Link
                        className="card bg-base-200 shadow-xl hover:bg-base-200 transition"
                        href={`/dashboard/${project.id}`}
                        key={project.id}
                    >
                        <div className="card-body">
                            <h2 className="card-title">{project.name}</h2>
                            <p>{project.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default DashboardHome;
