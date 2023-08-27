import { HTMLAttributes } from 'react';


export interface DateComponentProps extends HTMLAttributes<HTMLInputElement> {
    date?: string | Date | number | null
    format?: string
}
