import { toast } from 'react-hot-toast';
import useSWR, { SWRConfiguration } from 'swr';

import { useProjectSelector, useTaskSelector } from '@/hooks';
import { commentsFetch } from '@/requests';
import { CommentType } from '@/schemas';

import { FetchCommentsKey } from './keys';


type Options = SWRConfiguration<CommentType[], Error>

export function useCommentsFetch({ enable = true }: {enable?: boolean} = {}, options: Options = {}) {
    const projectId = useProjectSelector(project => project.id);
    const taskId = useTaskSelector(task => task.id);

    return useSWR<CommentType[], Error, FetchCommentsKey|undefined>(
        enable ? ['COMMENTS', { projectId, taskId }] : undefined,

        async () => {
            return commentsFetch({ projectId, taskId });
        },
        {
            ...options,
            keepPreviousData: true,
            onError(...args) {
                toast.error('Failed to fetch comments. Try again later.', { id: 'COMMENTS_FETCH' });
                options?.onError?.(...args);
            },
        },
    );
}

