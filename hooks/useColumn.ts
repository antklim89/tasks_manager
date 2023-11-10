import { createContext, useContext, useContextSelector } from 'use-context-selector';

import type { ColumnType } from '@/schemas';


export const ColumnContext = createContext<ColumnType|null>(null);

export function useColumn(isRequired?: true): ColumnType
export function useColumn(isRequired: false): ColumnType | null

export function useColumn(isRequired?: boolean): ColumnType | null {
    const columnContext = useContext(ColumnContext);
    if (!columnContext) {
        if (isRequired) throw new Error('The useColumn is not in the Column provider.');
        return null;
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
