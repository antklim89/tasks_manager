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
        .map(([k, v]) => `${k}: "${v}"`)
        .join(', ');

    if (text.length === 0) return '';
    return `${startText}${text}${endText}`;
}
