import { useEffect, useState } from 'react';

import { DateComponentProps } from './DateComponent.types';


const DateComponent = ({ date, format: dateFormat = 'dd-MMM-yyyy H:mm', ...props }: DateComponentProps) => {
    const [formatedDate, setFormatedDate] = useState<string | null>(null);

    useEffect(() => {
        if (!date) return;
        import('date-fns')
            .then(({ format }) => setFormatedDate(format(new Date(date), dateFormat)));
    }, [date]);

    return (
        <span {...props}>
            {formatedDate}&nbsp;
        </span>
    );
};

export default DateComponent;

