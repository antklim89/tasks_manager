import { formatDate } from './formatDate';


const isISODate = (date: string) => 
    /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/.test(date);

export function formatHistoryData<T extends Record<string, unknown>>({
    data: obj, oldData, fields, startText = '', endText = '.',
}: {
    data: T;
    oldData?: T,
    fields?: (keyof T)[];
    startText?: string;
    endText?: string;
}): string {
    const text = Object.entries(obj)
        .filter(([key]) => fields ? fields.includes(key) : true)
        .filter(([key, val]) => oldData ? oldData[key] !== val : true)
        .map(([k, v]) => `${k}: "${typeof v === 'string' && isISODate(v) ? formatDate(v) : v}"`)
        .join(', ');

    if (text.length === 0) return '';
    return `${startText}${text}${endText}`;
}

