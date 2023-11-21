import { toast } from 'react-hot-toast';
import useSWR, { SWRConfiguration } from 'swr';

import { projectsFetch } from '@/requests';
import { ProjectType } from '@/schemas';

import { FetchProjectsKey } from './keys';


type Options = SWRConfiguration<ProjectType[], Error> & { defaultValue?: ProjectType[] };

export function useProjectsFetch({ defaultValue, ...options }: Options = {}) {

    return useSWR<ProjectType[], Error, FetchProjectsKey>(
        ['PROJECTS'],

        () => {
            return defaultValue || projectsFetch();
        },
        {
            ...options,
            onError(...args) {
                toast.error('Failed to fetch projects. Try again later.', { id: 'PROJECTS_FETCH' });
                options?.onError?.(...args);
            },
        },
    );
}


