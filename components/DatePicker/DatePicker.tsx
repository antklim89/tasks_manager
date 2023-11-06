'use client';
import ReactDatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { formatDateString } from '@/utils';

import { DatePickerProps } from './DatePicker.types';


const DatePicker = ({ onChange, customInput, ...props }: DatePickerProps) => {
    return (
        // @ts-expect-error DatePicker type error
        <ReactDatePicker
            showTimeSelect
            // @ts-expect-error DatePicker type error
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
