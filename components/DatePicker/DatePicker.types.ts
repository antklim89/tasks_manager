import { ReactNode } from 'react';


export interface DatePickerProps {
    customInput: ReactNode;
    value?: string | Date | null;
    onChange: (date: Date | null) => void
}
