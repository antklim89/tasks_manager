'use client';
import { z } from 'zod';

import { Button } from '@/components';
import { useSearchParamsState } from '@/hooks';
import { useHistoryFetch } from '@/request-hooks';
import { HISTORY_LIMIT } from '@/requests/historyFetch';

import HistoryItem from './HistoryItem';
import HistoryPanel from './HistoryPanel';


const History = () => {
    const [startDate, setStartDate] = useSearchParamsState('start-at', { schema: z.string().datetime() });
    const { data: historyPages = [], setSize, size, isValidating } = useHistoryFetch();
    const hasNext = (historyPages.at(-1)?.length || 0) === HISTORY_LIMIT;

    return (
        <div className="p-4">
            <HistoryPanel defaultStartDate={startDate} onStartDateChange={setStartDate} />
            <div className="flex flex-col">
                {historyPages.map((historyPage) => historyPage.map((historyItem) => (
                    <HistoryItem historyItem={historyItem} key={historyItem.id} />
                )))}
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
