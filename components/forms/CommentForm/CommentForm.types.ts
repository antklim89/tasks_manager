import { ComponentProps, ReactNode } from 'react';

import { CommentUpdateType } from '@/schemas';


export interface CommentFormProps extends Omit<ComponentProps<'form'>, 'onSubmit'> {
    children: ReactNode
    onSubmit?: (data: CommentUpdateType) => Promise<unknown>
}
