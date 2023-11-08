import { useContext, useContextSelector } from 'use-context-selector';

import { ColumnContext } from '@/features/Column/Column';
import type { ColumnType } from '@/schemas';


export function useColumn(): ColumnType {
    const columnContext = useContext(ColumnContext);
    if (!columnContext) {
        throw new Error('The useColumn is not in the Column provider.');
    }
    return columnContext;
}

export function useColumnSelector<Selected>(selector: (value: ColumnType) => Selected): Selected  {
    const columnContext = useContextSelector<ColumnType|null, Selected>(ColumnContext, (value) => {
        if (!value) {
            throw new Error('The useColumn is not in the Column provider.');
        }
        return selector(value);
    });
    return columnContext;
}
