import { useRef } from 'react';
import { toast } from 'react-hot-toast';
import useSWR, { SWRConfiguration } from 'swr';

import { useProjectDefaults, useProjectSelector }from '@/hooks';
import { columnsFetch } from '@/requests';
import { ColumnType } from '@/schemas';

import { FetchColumnsKey } from './keys';


type Options = SWRConfiguration<ColumnType[], Error>

export function useColumnsFetch(options: Options = {}) {
    const projectId = useProjectSelector((project) => project.id);
    const { defaultColumns } = useProjectDefaults();

    const isFirstFetch = useRef(true);


    return useSWR<ColumnType[], Error, FetchColumnsKey>(
        ['COLUMNS', { projectId }],

        async () => {
            if (isFirstFetch.current && defaultColumns) {
                isFirstFetch.current = false;
                return defaultColumns;
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


