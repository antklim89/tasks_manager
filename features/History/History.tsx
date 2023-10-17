'use client';
import { useHistoryFetch } from '@/requests';


const History = () => {
    const { data: history = [], isLoading } = useHistoryFetch();

    return (
        <div>
            {history.map((historyItem) => (
                <div key={historyItem.id}>
                    {historyItem.table}
                </div>
            ))}
        </div>
    );
};

export default History;
