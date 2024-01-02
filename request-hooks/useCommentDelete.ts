import { toast } from 'react-hot-toast';
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { useProjectSelector, useCommentSelector, useTaskSelector } from '@/hooks';
import { CommentType } from '@/schemas';
import { getSupabaseClient } from '@/supabase/client';

import { FetchCommentsKey } from './keys';


const TOAST_ID = 'COMMENT_DELETE';

type Options = SWRMutationConfiguration<unknown, Error, FetchCommentsKey, unknown, CommentType[]>;

export function useCommentDelete(options?: Options) {
    const commentId = useCommentSelector(comment => comment.id);
    const projectId = useProjectSelector(project => project.id);
    const taskId = useTaskSelector(task => task.id);

    return useSWRMutation<unknown, Error, FetchCommentsKey, unknown, CommentType[]>(
        ['COMMENTS', { taskId, projectId }],

        async () => {
            toast.loading('Comment is deleting...', { id: TOAST_ID });
            const supabase = await getSupabaseClient();

            const { error } = await supabase
                .from('comments')
                .delete()
                .eq('id', commentId);

            if (error) throw error;
        },
        {
            ...options,
            revalidate: false,
            populateCache(_, currentComments = []) {
                return currentComments.filter(({ id }) => id !== commentId);
            },
            onSuccess(...args) {
                toast.success('Comment deleted.', { id: TOAST_ID });
                options?.onSuccess?.(...args);
            },
            onError(...args) {
                toast.error('Failed to delete a comment. Try again later.', { id: TOAST_ID });
                options?.onError?.(...args);
            },
        },
    );
}
