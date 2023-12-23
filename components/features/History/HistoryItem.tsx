import { HistoryType } from '@/schemas';
import { formatDate } from '@/utils';


const HistoryItem = ({ historyItem }: { historyItem: HistoryType }) => {
    const date = formatDate(historyItem.createdAt, 'dd MMM yyyy');
    const time = formatDate(historyItem.createdAt, 'HH:mm');

    return (
        <p className="flex items-center text-sm gap-2 p-1 sm:text-md sm:gap-4 sm:p-4 even:bg-primary" key={historyItem.id}>
            <span className="flex flex-col sm:flex-row gap-2">
                <span className='whitespace-nowrap'>{date}</span>
                <span className='whitespace-nowrap'>{time}</span>
            </span>
            <span>-</span>
            <span>{historyItem.body}</span>
        </p>
    );
};

export default HistoryItem;
