import { useRef } from 'react';
import { toast } from 'react-hot-toast';
import useSWR, { SWRConfiguration } from 'swr';

import { projectsFetch } from '@/requests';
import { ProjectType } from '@/schemas';

import { FetchProjectsKey } from './keys';


type Options = SWRConfiguration<ProjectType[], Error> & { defaultValue?: ProjectType[] };

export function useProjectsFetch({ id }: { id?: number } = {}, { defaultValue, ...options }: Options = {}) {
    const isFirstFetch = useRef(true);

    return useSWR<ProjectType[], Error, FetchProjectsKey>(
        ['PROJECTS'],

        () => {
            if (isFirstFetch.current && defaultValue) {
                isFirstFetch.current = false;
                return defaultValue;
            }
            return projectsFetch(id);
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


