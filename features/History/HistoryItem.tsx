import { HistoryTables, HistoryType } from '@/schemas';
import { formatDate } from '@/utils';


const HistoryItem = ({ historyItem }: { historyItem: HistoryType }) => {
    return (
        <p className="flex gap-4 p-2 even:bg-primary" key={historyItem.id}>
            <span>{formatDate(historyItem.createdAt)}</span>
            <span>{historyItem.table}</span>
            <span>{formatHistoryItem(historyItem)}</span>
        </p>
    );
};

export default HistoryItem;


function formatHistoryItem({ operation, newData, oldData, table }: HistoryType): string {
    if (table === 'projects') {
        if (operation === 'UPDATE') {
            return formatUpdatedValues({ newData, oldData, table, name: String(oldData?.name) });
        }

    } else if (table === 'tasks') {
        if (operation === 'UPDATE') {
            return formatUpdatedValues({ newData, oldData, table, name: String(oldData?.title) });
        } else if (operation === 'INSERT') {
            return formatInsertedValues({ table, newData });
        } else if (operation === 'DELETE') {
            return formatDeletedValues({ table, name: oldData?.title });
        }
    }

    return `${table} changed.`;
}


const formatArrayStrings = new Intl.ListFormat('en');

function formatDeletedValues({
    table,
    name,
}: {
    table: string;
    name?: unknown;
 }): string {
    return `Deleted ${table} ${name || ''}.`;
}

function formatInsertedValues({
    table,
    newData,
}: {
    table: string;
    newData: Record<string, unknown> | null;
 }): string {
    return `New ${table} added with ${formatInsetedData(newData)}.`;
}

function formatUpdatedValues({
    name,
    newData,
    oldData,
    table,
}: {
    name?: string,
    newData: Record<string, unknown> | null;
    oldData: Record<string, unknown> | null;
    table: HistoryTables;
}): string {
    return `Updated ${formatUpdatedData(newData, oldData)} in ${table} "${name || ''}".`;
}

function omitUnchangedValues(
    newData: Record<string, unknown> | null,
    oldData?: Record<string, unknown> | null,
): Record<string, unknown> {
    if (!newData) return {};
    if (!oldData) return newData;

    return Object.entries(newData).reduce((acc, [key, val]) => {
        if (val === oldData[key]) return acc;
        acc[key] = val;
        return acc;
    }, {} as Record<string, unknown>);
}

function formatUpdatedData(
    newData: Record<string, unknown> | null,
    oldData?: Record<string, unknown> | null,
): string {
    const changedValues = omitUnchangedValues(newData, oldData);

    return formatArrayStrings.format(Object.entries(changedValues).map(([key, val]) => (`${key} to "${val}"`)));
}

function formatInsetedData(
    newData: Record<string, unknown> | null,
    oldData?: Record<string, unknown> | null,
): string {
    const changedValues = omitUnchangedValues(newData, oldData);
    const notNullishValues = omitNullishFields(changedValues);

    return formatArrayStrings.format(Object.entries(notNullishValues).map(([key, val]) => (`${key}: "${val}"`)));
}

function omitNullishFields(obj: Record<string, unknown>): Record<string, unknown> {
    return Object.fromEntries(Object.entries(obj).filter(([, val]) => val));
}
