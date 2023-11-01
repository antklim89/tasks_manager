import { useState } from 'react';

import { DatePicker, Input } from '@/components';

import { HistoryPanelProps } from './History.types';


const HistoryPanel = ({ onStartDateChange }: HistoryPanelProps) => {
    const [startDate, setStartDate] = useState<Date|undefined>(undefined);

    const handleStartDateChange = (date?: Date | null): void => {
        setStartDate(date || undefined);
        onStartDateChange(date || undefined);
    };

    return (
        <div className="flex justify-start items-center gap-2">
            <DatePicker
                customInput={(
                    <Input reset={handleStartDateChange} />
                )}
                placeholderText="Filter by date"
                selected={startDate}
                onChange={handleStartDateChange}
            />
        </div>
    );
};

export default HistoryPanel;
