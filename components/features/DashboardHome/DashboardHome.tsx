'use client';
import Link from 'next/link';

import { useProjectsFetch } from '@/request-hooks';
import { ProjectType } from '@/schemas';
import { cn } from '@/utils';


const DashboardHome = ({ defaultProjects }: { defaultProjects: ProjectType[] }) => {
    const { data: projects = defaultProjects } = useProjectsFetch({ defaultValue: defaultProjects });

    return (
        <div className='container'>
            <h2 className="text-4xl text-center">Dashboard</h2>
            <h3 className='text-2xl my-4 text-center'>Select your project</h3>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {projects?.map((project) => {
                    const isDescriptionLong = (project.description || '').length > 200;
                    return (
                        <Link
                            className="card bg-base-200 shadow-xl hover:scale-105 transition"
                            href={`/dashboard/${project.id}`}
                            key={project.id}
                        >
                            <div className="card-body">
                                <h2 className="card-title">{project.name}</h2>
                                <p 
                                    className={cn('text-start', { 'tooltip tooltip-bottom ': isDescriptionLong })} 
                                    data-tip={project.description}
                                >
                                    {project.description?.slice(0, 100)}
                                    {isDescriptionLong ? '...' : ''}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default DashboardHome;
