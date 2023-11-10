import { useRef } from 'react';
import { toast } from 'react-hot-toast';
import useSWR, { SWRConfiguration } from 'swr';

import { useProjectSelector }from '@/hooks';
import { columnsFetch } from '@/requests';
import { ColumnType } from '@/schemas';

import { FetchColumnsKey } from './keys';


type Options = SWRConfiguration<ColumnType[], Error> & { defaultValue?: ColumnType[] };

export function useColumnsFetch({ defaultValue, ...options }: Options = {}) {
    const projectId = useProjectSelector((project) => project.id);

    const isFirstFetch = useRef(true);


    return useSWR<ColumnType[], Error, FetchColumnsKey>(
        ['COLUMNS', { projectId }],

        async () => {
            if (isFirstFetch.current && defaultValue) {
                isFirstFetch.current = false;
                return defaultValue;
            }

            return columnsFetch({ projectId });
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


