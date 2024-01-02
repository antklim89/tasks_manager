import useSWR from 'swr';

import { useProjectSelector, useTaskSelector } from '@/hooks';
import { getSupabaseClient } from '@/supabase/client';

import { FetchCommentsCountKey } from './keys';


export function useCommentsCount() {
    const projectId = useProjectSelector(project => project.id);
    const taskId = useTaskSelector(task => task.id);

    return useSWR<number, Error, FetchCommentsCountKey>(
        ['COMMENTS_COUNT', { projectId, taskId }],

        async () => {
            const supabase = await getSupabaseClient();
            
            const { count, error } = await supabase.from('comments')
                .select('*', { count: 'exact', head: true })
                .eq('projectId', projectId)
                .eq('taskId', taskId);

            if (error) throw error;

            return count || 0;
        },
        {
            keepPreviousData: true,
        },
    );
}

