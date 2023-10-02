'use client';
import { ReactNode, createContext } from 'react';

import type { MemberType } from '@/schemas';


export const ProjectContext = createContext<{projectId: number, member: MemberType} | null>(null);

const ProjectProvider = ({
    children,
    projectId,
    member,
}: {
    children: ReactNode,
    projectId: number,
    member: MemberType
}) => {
    return (
        <ProjectContext.Provider value={{ projectId, member }}>{children}</ProjectContext.Provider>
    );
};

export default ProjectProvider;
