import { MouseEventHandler, useState } from 'react';

import { Button, DatePicker, Input, Menu } from '@/components';
import { HistoryTables, tables } from '@/schemas';

import { HistoryPanelProps } from './History.types';


const HistoryPanel = ({ onStartDateChange }: HistoryPanelProps) => {
    const [startDate, setStartDate] = useState<Date|null>(null);
    const [table, setTable] = useState<HistoryTables|null>(null);

    const handleStartDateChange = (date?: Date | null): void => {
        setStartDate(date || null);
        onStartDateChange(date || null);
    };

    const handleTableChange: MouseEventHandler<HTMLButtonElement> = (e) => {
        setTable(e.currentTarget.name as HistoryTables);
    };
    return (
        <div className="flex justify-start items-center gap-2">
            <DatePicker
                className="w-auto"
                customInput={(
                    <Input
                        reset={handleStartDateChange}
                    />
                )}
                placeholderText="Filter by date"
                selected={startDate}
                onChange={handleStartDateChange}
            />
            <Menu button={<Button>{table || 'Filter by table'}</Button>}>
                <Button onClick={handleTableChange}>ALL</Button>
                {tables.map((t) => (
                    <Button key={t} name={t} onClick={handleTableChange}>{t}</Button>
                ))}
            </Menu>
        </div>
    );
};

export default HistoryPanel;
