import format from 'date-fns/format';


export const formatDateString = 'dd-MMM-yyyy HH:mm';

export function formatDate(date: number | Date | string | number, formatString?: string): string
export function formatDate(date?: null | undefined, formatString?: string): undefined
export function formatDate(date?: null | undefined | string | number | Date, formatString?: string): string|undefined

export function formatDate(date?: null | undefined | string | number | Date, customFormat?: string): string|undefined {
    if (!date) return undefined;
    if (typeof date === 'string') return format(new Date(date), customFormat || formatDateString);
    return format(date, formatDateString);
}
