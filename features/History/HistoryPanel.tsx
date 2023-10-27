import { useState } from 'react';

import { DatePicker, Input } from '@/components';

import { HistoryPanelProps } from './History.types';


const HistoryPanel = ({ onStartDateChange }: HistoryPanelProps) => {
    const [startDate, setStartDate] = useState<Date|null>(null);

    const handleStartDateChange = (date?: Date | null): void => {
        setStartDate(date || null);
        onStartDateChange(date || null);
    };

    return (
        <div>
            <DatePicker
                customInput={(
                    <Input
                        className="w-full"
                        label="Start at"
                        reset={handleStartDateChange}
                    />
                )}
                value={startDate}
                onChange={handleStartDateChange}
            />
        </div>
    );
};

export default HistoryPanel;
