import type { ReactNode } from 'react';

import type { MemberType, ProjectType, ProjectListType } from '@/schemas';


export interface ProjectValuesProviderProps {
    defaultProject: ProjectType
    defaultProjects: ProjectListType
    defaultMember: MemberType
    children: ReactNode
}
