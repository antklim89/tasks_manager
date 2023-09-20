import { lazy, Suspense } from 'react';

import { DatePickerProps } from './DatePicker.types';


const ReactDatePicker = lazy(() => import('./DatePicker'));

const DatePicker = (props: DatePickerProps) => {
    return (
        <Suspense fallback={props.customInput}>
            <ReactDatePicker {...props} />
        </Suspense>
    );
};

export default DatePicker;
