import { ChangeEventHandler } from 'react';
import { z } from 'zod';

import { DatePicker, Input } from '@/components';
import { useSearchParamsState } from '@/hooks';


const HistoryPanel = () => {
    const [startDate, setStartDate] = useSearchParamsState('start-at', { schema: z.string().datetime() });
    const [search, setSearch] = useSearchParamsState('search', { defer: 700 });

    const handleStartDateChange = (date?: Date | null): void => {
        setStartDate(date?.toISOString());
    };


    const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div className="flex justify-start items-center gap-2">
            <DatePicker
                customInput={(
                    <Input reset={handleStartDateChange} />
                )}
                placeholderText="Filter by date"
                selected={startDate ? new Date(startDate) : null}
                onChange={handleStartDateChange}
            />
            <Input
                placeholder='Search'
                reset={() => setSearch('')}
                value={search ?? ''}
                onChange={handleSearchChange}
            />
        </div>
    );
};

export default HistoryPanel;
