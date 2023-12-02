import { useState } from 'react';

import { DatePicker, Input } from '@/components';

import { HistoryPanelProps } from './History.types';


const HistoryPanel = ({ onStartDateChange, defaultStartDate }: HistoryPanelProps) => {
    const [startDate, setStartDate] = useState<string|undefined>(defaultStartDate);

    const handleStartDateChange = (date?: Date | null): void => {
        setStartDate(date?.toISOString());
        onStartDateChange(date?.toISOString());
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
        </div>
    );
};

export default HistoryPanel;
