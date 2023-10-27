'use client';
import ReactDatePicker, { type ReactDatePickerProps } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';


const DatePicker = ({ onChange, value, customInput, ...props }: ReactDatePickerProps) => {
    return (
        <ReactDatePicker
            showTimeSelect
            className="w-full"
            customInput={customInput}
            dateFormat="dd-MMM-yyyy HH:mm"
            selected={value ? new Date(value) : null}
            timeFormat="HH:mm"
            timeIntervals={10}
            wrapperClassName="w-full"
            onChange={onChange}
            {...props}
        />
    );
};


export default DatePicker;
