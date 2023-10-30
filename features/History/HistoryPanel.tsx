import { MouseEventHandler, useState } from 'react';

import { Button, DatePicker, Input, Menu } from '@/components';
import { HistoryTables, tables } from '@/schemas';

import { HistoryPanelProps } from './History.types';


const HistoryPanel = ({ onStartDateChange, onTableChange }: HistoryPanelProps) => {
    const [startDate, setStartDate] = useState<Date|undefined>(undefined);
    const [table, setTable] = useState<HistoryTables|undefined>(undefined);

    const handleStartDateChange = (date?: Date | null): void => {
        setStartDate(date || undefined);
        onStartDateChange(date || undefined);
    };

    const handleTableChange: MouseEventHandler<HTMLButtonElement> = (e) => {
        const tableName = e.currentTarget.name as HistoryTables;
        setTable(tableName.length === 0 ? undefined : tableName);
        onTableChange(tableName.length === 0 ? undefined : tableName);
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
            <Menu button={<Button>{table || 'Filter by table'}</Button>}>
                <Button color="ghost" onClick={handleTableChange}>ALL</Button>
                {tables.map((tableName) => (
                    <Button
                        color="ghost"
                        key={tableName}
                        name={tableName}
                        onClick={handleTableChange}
                    >
                        {tableName}
                    </Button>
                ))}
            </Menu>
        </div>
    );
};

export default HistoryPanel;
