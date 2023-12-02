import type { ReactNode } from 'react';

import type { MemberType, ProjectType } from '@/schemas';


export interface ProjectValuesProviderProps {
    defaultProject: ProjectType
    defaultProjects: ProjectType[]
    defaultMember: MemberType
    children: ReactNode
}
