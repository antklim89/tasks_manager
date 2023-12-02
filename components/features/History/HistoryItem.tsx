import { HistoryType } from '@/schemas';
import { formatDate } from '@/utils';


const HistoryItem = ({ historyItem }: { historyItem: HistoryType }) => {
    return (
        <p className="flex gap-4 p-2 even:bg-primary" key={historyItem.id}>
            <span>{formatDate(historyItem.createdAt)}</span>
            <span>{historyItem.body}</span>
        </p>
    );
};

export default HistoryItem;
