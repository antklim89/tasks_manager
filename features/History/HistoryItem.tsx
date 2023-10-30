import { HistoryType } from '@/schemas';
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


function formatHistoryItem(historyItem: HistoryType): string {
    switch (historyItem.table) {
    case 'projects':
        return formatHistoryProjects(historyItem);
    default:
        return `Table ${historyItem.table} changed`;
    }
}

function formatHistoryProjects({ operation, newData, oldData }: HistoryType): string {
    switch (operation) {
    case 'INSERT':
        return `Project ${newData?.name} created.`;
    case 'UPDATE':
        return `Updated ${getChangedField(newData, oldData)} in project ${oldData?.name}`;
    case 'DELETE':
        return `Project ${oldData?.name} deleted.`;

    default: return 'Projects updated.';
    }
}

function getChangedField(newData: Record<string, unknown> | null, oldData: Record<string, unknown> | null): string {
    console.log('==  oldData\n', oldData);
    console.log('==  newData\n', newData);
    return 'X';
}

