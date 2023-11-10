import { useRef } from 'react';
import { toast } from 'react-hot-toast';
import useSWR, { SWRConfiguration } from 'swr';

import { projectFetch } from '@/requests';
import { ProjectType } from '@/schemas';

import { FetchProjectKey } from './keys';


type Options = SWRConfiguration<ProjectType, Error> & { defaultValue?: ProjectType };

export function useProjectFetch({ projectId }: { projectId: number }, { defaultValue, ...options }: Options = {}) {
    const isFirstFetch = useRef(true);

    return useSWR<ProjectType, Error, FetchProjectKey>(
        ['PROJECT', { projectId }],

        () => {
            // if (isFirstFetch.current && defaultValue) {
            // isFirstFetch.current = false;
            console.log('==  defaultValue\n', defaultValue);
            return defaultValue!;
            // }
            // return projectFetch({ projectId });
        },
        {
            ...options,
            onError(...args) {
                toast.error('Failed to fetch projects. Try again later.', { id: 'PROJECT_FETCH' });
                options?.onError?.(...args);
            },
        },
    );
}


