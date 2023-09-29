'use client';
import { ReactNode, createContext } from 'react';


export const ProjectIdContext = createContext<number | null>(null);

const ProjectIdProvider = ({ children, projectId }: { children: ReactNode, projectId: number }) => {
    return (
        <ProjectIdContext.Provider value={projectId}>{children}</ProjectIdContext.Provider>
    );
};

export default ProjectIdProvider;
