import { toast } from 'react-hot-toast';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { useProjectSelector, useTaskSelector } from '@/hooks';
import { CommentType, CommentUpdateType, commentSchema } from '@/schemas';
import { getSupabaseClient, getSupabaseUser } from '@/supabase/client';

import { FetchCommentsKey } from './keys';


const TOAST_ID = 'COMMENT_CREATE';

type Options = SWRMutationConfiguration<CommentType, Error, FetchCommentsKey, CommentUpdateType, CommentType[]>;

export function useCommentCreate(options?: Options) {
    const projectId = useProjectSelector(project => project.id);
    const taskId = useTaskSelector(task => task.id);

    return useSWRMutation<CommentType, Error, FetchCommentsKey, CommentUpdateType, CommentType[]>(
        ['COMMENTS', { projectId, taskId }],

        async (key, { arg }) => {
            toast.loading('Comment is creating...', { id: TOAST_ID });
            const supabase = await getSupabaseClient();
            const { id: authorId } = await getSupabaseUser();

            const { error, data } = await supabase
                .from('comments')
                .insert({ projectId, taskId, authorId, ...arg })
                .select()
                .single();

            if (error) throw error;
            return commentSchema.parse(data);
        },
        {
            ...options,
            onSuccess(...args) {
                toast.success('Comment created succesfully.', { id: TOAST_ID });
                options?.onSuccess?.(...args);
            },
            onError(...args) {
                toast.error('Failed to create a comment. Try again later.', { id: TOAST_ID });
                options?.onError?.(...args);
            },
            revalidate: false,
            populateCache(newComment, currentData = []) {
                return [newComment, ...currentData];
            },
        },
    );
}
