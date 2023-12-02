'use client';
import { ProjectDefaultsContext } from '@/hooks';

import { ProjectDefaultsProviderProps } from './ProjectDefaultsProvider.types';


const ProjectDefaultsProvider = ({
    children,
    ...values
}: ProjectDefaultsProviderProps) => {
    return (
        <ProjectDefaultsContext.Provider value={values}>{children}</ProjectDefaultsContext.Provider>
    );
};

export default ProjectDefaultsProvider;
