'use client';
import { useState } from 'react';

import { Button } from '@/components';
import { HISTORY_LIMIT, useHistoryFetch } from '@/request-hooks';
import { type HistoryTables } from '@/schemas';
import { formatDate } from '@/utils';

import HistoryPanel from './HistoryPanel';


const History = () => {
    const [startDate, setStartDate] = useState<Date|undefined>(undefined);
    const [table, setTable] = useState<HistoryTables|undefined>(undefined);
    const { data = [], setSize, size, isValidating } = useHistoryFetch({ startDate, table });
    const hasNext = (data.at(-1)?.length || 0) === HISTORY_LIMIT;

    return (
        <div className="p-4">
            <HistoryPanel onStartDateChange={setStartDate} onTableChange={setTable} />
            <div className="flex flex-col">
                {data.map((i) => (
                    i.map((historyItem) => (
                        <p className="p-2 even:bg-primary" key={historyItem.id}>
                            <span className="inline-block pr-4 min-w-[250px]">
                                {formatDate(historyItem.createdAt)}
                            </span>
                            <span>{historyItem.table}</span>
                        </p>
                    ))
                ))}
                {isValidating
                    ? Array.from({ length: HISTORY_LIMIT }, (_, i) => i).map((i) => (
                        <div className="skeleton my-2 h-9 w-full" key={i} />
                    ))
                    : null}
            </div>
            <div className="flex justify-center py-4">
                {hasNext
                    ? (
                        <Button
                            outline
                            isLoading={isValidating}
                            onClick={() => setSize(size + 1)}
                        >
                            Show More
                        </Button>
                    )
                    : null}
            </div>
        </div>
    );
};

export default History;
