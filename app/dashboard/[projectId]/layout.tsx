import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { z } from 'zod';

import { ProjectProvider } from '@/components';
import { memberSchema } from '@/schemas';
import { getSupabaseClient } from '@/supabase/client';
import { getServerUser } from '@/supabase/server';


const ProjectLayout = async ({ children, params }: { children: ReactNode, params: { projectId?: string[] } }) => {
    const projectId = await z.coerce.number().parseAsync(params?.projectId);
    const supabase = await getSupabaseClient();
    const user = await getServerUser();

    const { data } = await supabase.from('members')
        .select('*, profile:userId(*)')
        .eq('projectId', projectId)
        .eq('userId', user.id)
        .single();

    if (!data) return notFound();
    const member = await memberSchema.parseAsync(data);
    return <ProjectProvider member={member} projectId={projectId}>{children}</ProjectProvider>;
};

export default ProjectLayout;
