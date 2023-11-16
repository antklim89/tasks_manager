'use client';
import { MemberContext, ProjectContext } from '@/hooks';
import { ProjectListContext } from '@/hooks/useProjectList';
import { useMemberFetch, useProjectFetch, useProjectsFetch } from '@/request-hooks';

import { ProjectValuesProviderProps } from './ProjectValuesProvider.types';


const ProjectValuesProvider = ({
    defaultMember, 
    defaultProject, 
    defaultProjects,
    children,
}: ProjectValuesProviderProps) => {
    const { data: project = defaultProject } = useProjectFetch({ project: defaultProject });
    const { data: member = defaultMember } = useMemberFetch({ member: defaultMember });
    const { data: projects = defaultProjects || [] } = useProjectsFetch({ defaultValue: defaultProjects });
    
    return (
        <ProjectListContext.Provider value={projects}>
            <MemberContext.Provider value={member}>
                <ProjectContext.Provider value={project}>
                    {children}
                </ProjectContext.Provider>
            </MemberContext.Provider>
        </ProjectListContext.Provider>
    );
};

export default ProjectValuesProvider;
