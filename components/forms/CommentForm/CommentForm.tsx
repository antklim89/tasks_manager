import { zodResolver } from '@hookform/resolvers/zod';
import { KeyboardEvent } from 'react';
import { useForm } from 'react-hook-form';

import Input from '@/components/ui/Input';
import { CommentUpdateType, commentUpdateSchema } from '@/schemas';

import { CommentFormProps } from './CommentForm.types';


const CommentForm = ({ children, onSubmit, ...props }: CommentFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        reset,
        resetField,
    } = useForm<CommentUpdateType>({
        resolver: zodResolver(commentUpdateSchema),
        defaultValues: { text: '' },
    });

    const handleCreateTask = handleSubmit(async (data) => {
        if (onSubmit) onSubmit(data);
        reset({ text: '' }, { keepValues: false, keepDirty: false, keepIsValid: true  });
    });
    
    function handlekeyDown(e: KeyboardEvent<HTMLTextAreaElement>): void {
        if (e.key === 'Enter' && e.ctrlKey) handleCreateTask();
    }

    return (
        <form onSubmit={handleCreateTask} {...props}>
            <div className="flex flex-col gap-2">
                <Input
                    as="textarea"
                    {...register('text')}
                    errorMessage={errors.text?.message}
                    placeholder="Enter your comment..."
                    reset={() => resetField('text', { defaultValue: '' })}
                    rows={isDirty ? 2 : 1}
                    onKeyDown={handlekeyDown}
                />
            </div>
            {(errors.text || !isDirty) ? null : children}
        </form>
    );
};

export default CommentForm;
