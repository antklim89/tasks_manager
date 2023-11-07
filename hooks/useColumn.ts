import { useContext } from 'react';

import { ColumnContext } from '@/features/Column/Column';
import type { ColumnType } from '@/schemas';


export function useColumn(): ColumnType {
    const columnContext = useContext(ColumnContext);
    if (!columnContext) {
        throw new Error('The useColumn is not in the Column provider.');
    }
    return columnContext;
}
