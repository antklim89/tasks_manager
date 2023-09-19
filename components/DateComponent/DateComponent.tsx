'use client';
import format from 'date-fns/format';

import { DateComponentProps } from './DateComponent.types';


const DateComponent = ({ date, format: dateFormat = 'dd-MMM-yyyy H:mm', ...props }: DateComponentProps) => {
    if (!date) return null;
    return (
        <span {...props}>
            {format(new Date(date), dateFormat)}&nbsp;
        </span>
    );
};

export default DateComponent;

