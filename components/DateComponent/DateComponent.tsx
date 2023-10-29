'use client';
import { formatDate, formatDateString } from '@/utils';

import { DateComponentProps } from './DateComponent.types';


const DateComponent = ({ date, format: dateFormat = formatDateString, ...props }: DateComponentProps) => {
    if (!date) return null;
    return (
        <span {...props}>
            {formatDate(date, dateFormat)}&nbsp;
        </span>
    );
};

export default DateComponent;

