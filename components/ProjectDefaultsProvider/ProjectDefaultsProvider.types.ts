import type { ReactNode } from 'react';

import type { ProjectDefaultsContextType } from '@/hooks';


export interface ProjectDefaultsProviderProps extends ProjectDefaultsContextType {
    children: ReactNode
}
