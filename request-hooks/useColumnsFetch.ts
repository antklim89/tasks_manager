import { useRef } from 'react';
import { toast } from 'react-hot-toast';
import useSWR, { SWRConfiguration } from 'swr';

import { useProject } from '@/hooks';
import { columnsFetch } from '@/requests';
import { ColumnType } from '@/schemas';

import { FetchColumnsKey } from './keys';


type Options = SWRConfiguration<ColumnType[], Error> & { defaultValue?: ColumnType[] };

export function useColumnsFetch({ defaultValue, ...options }: Options = {}) {
    const { projectId } = useProject();

    const firstFetch = useRef(true);


    return useSWR<ColumnType[], Error, FetchColumnsKey>(
        ['COLUMNS', { projectId }],

        async () => {
            if (firstFetch.current && defaultValue) {
                firstFetch.current = false;
                return defaultValue;
            }

            return columnsFetch(projectId);
        },
        {
            ...options,
            onError(...args) {
                toast.error('Failed to fetch columns. Try again later.', { id: 'COLUMNs_FETCH' });
                options?.onError?.(...args);
            },

        },
    );
}


