export function formatHistoryData<T extends Record<string, unknown>>({
    data: obj, fields, startText = '', endText = '.',
}: {
    data: T;
    fields: (keyof T)[];
    startText?: string;
    endText?: string;
}): string {
    const text = Object.entries(obj)
        .filter(([key]) => fields.includes(key))
        .filter(([, val]) => val)
        .map(([k, v]) => `${k}: "${v}"`)
        .join(', ');

    if (text.length === 0) return '';
    return `${startText}${text}${endText}`;
}
