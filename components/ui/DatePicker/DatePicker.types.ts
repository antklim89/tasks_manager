import { InputHTMLAttributes, ReactElement } from 'react';
import { type ReactDatePickerProps } from 'react-datepicker';


export interface DatePickerProps extends Omit<ReactDatePickerProps, 'customInput'> {
    customInput: ReactElement<InputHTMLAttributes<HTMLInputElement>>
}
