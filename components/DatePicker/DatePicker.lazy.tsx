import { cloneElement, lazy, Suspense } from 'react';

import { formatDate } from '@/utils';

import { DatePickerProps } from './DatePicker.types';


const ReactDatePicker = lazy(() => import('./DatePicker'));

const DatePicker = (props: DatePickerProps) => {
    const fallbackInput = cloneElement(props.customInput, {
        disabled: true,
        value: (props.selected ? formatDate(props.selected) : undefined),
    });

    return (
        <Suspense fallback={fallbackInput}>
            <ReactDatePicker {...props} />
        </Suspense>
    );
};

export default DatePicker;
