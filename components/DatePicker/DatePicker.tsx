'use client';
import ReactDatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { formatDateString } from '@/utils';

import { DatePickerProps } from './DatePicker.types';


const DatePicker = ({ onChange, customInput, ...props }: DatePickerProps) => {
    return (
        <ReactDatePicker
            showTimeSelect
            customInput={customInput}
            dateFormat={formatDateString}
            timeFormat="HH:mm"
            timeIntervals={10}
            onChange={onChange}
            {...props}
        />
    );
};


export default DatePicker;
