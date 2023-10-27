import { lazy, Suspense } from 'react';
import type { ReactDatePickerProps } from 'react-datepicker';


const ReactDatePicker = lazy(() => import('./DatePicker'));

const DatePicker = (props: ReactDatePickerProps) => {
    return (
        <Suspense fallback={props.customInput}>
            <ReactDatePicker {...props} />
        </Suspense>
    );
};

export default DatePicker;
