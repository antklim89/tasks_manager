'use client';
import format from 'date-fns/esm/format';

import { useHistoryFetch } from '@/requests';


const History = () => {
    const { data: history = [] } = useHistoryFetch();

    return (
        <div className="p-4">
            {history.map((historyItem) => (
                <p className="p-2 even:bg-primary" key={historyItem.id}>
                    <span className="inline-block pr-4 min-w-[250px]">
                        {format(new Date(historyItem.createdAt), 'dd-MMM-yyy hh:mm:ss')}
                    </span>
                    <span>{historyItem.table}</span>
                </p>
            ))}
        </div>
    );
};

export default History;
