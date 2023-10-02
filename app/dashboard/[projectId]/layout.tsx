import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { z } from 'zod';

import { ProjectIdProvider } from '@/components';
import { memberSchema } from '@/schemas';
import { getServerClient, getServerUser } from '@/supabase/server';


const ProjectLayout = async ({ children, params }: { children: ReactNode, params: { projectId?: string[] } }) => {
    const projectId = await z.coerce.number().parseAsync(params?.projectId);
    const supabase = getServerClient();
    const user = await getServerUser();

    const { data } = await supabase.from('members')
        .select('*')
        .eq('projectId', projectId)
        .eq('userId', user.id)
        .single();

    if (!data) return notFound();
    const member = await memberSchema.parseAsync(data);
    return <ProjectIdProvider member={member} projectId={projectId}>{children}</ProjectIdProvider>;
};

export default ProjectLayout;
