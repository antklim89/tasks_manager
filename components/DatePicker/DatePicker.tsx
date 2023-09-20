'use client';

import ReactDatePicker from 'react-datepicker';

import { DatePickerProps } from './DatePicker.types';

import 'react-datepicker/dist/react-datepicker.css';


const DatePicker = ({ onChange, value, customInput }: DatePickerProps) => {
    return (
        <ReactDatePicker
            showTimeSelect
            className="w-full "
            customInput={customInput}
            dateFormat="dd-MMM-yyyy HH:mm"
            selected={value ? new Date(value) : null}
            timeFormat="HH:mm"
            timeIntervals={10}
            wrapperClassName="w-full"
            onChange={onChange}
        />
    );
};


export default DatePicker;
