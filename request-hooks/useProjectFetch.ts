import useSWR, { SWRConfiguration } from 'swr';

import { ProjectType } from '@/schemas';

import { FetchProjectKey } from './keys';


type Options = SWRConfiguration<ProjectType, Error>

export function useProjectFetch({ project }: { project: ProjectType }, options: Options = {}) {
    return useSWR<ProjectType, Error, FetchProjectKey>(
        ['PROJECT', { projectId: project.id }],

        () => project,
        options,
    );
}


