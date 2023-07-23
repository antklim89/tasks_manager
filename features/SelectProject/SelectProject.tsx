import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import { Database } from '@/supabase-types-generated';


const SelectProject = async () => {
    const supabase = createServerComponentClient<Database>({ cookies });
    const { data } = await supabase.auth.getSession();

    const { data: projects } = await supabase.from('projects').select('id, name').eq('owner', data.session?.user.id);

    return (
        <select className="select select-bordered w-full max-w-xs" defaultValue="default">
            <option disabled value="default">Select project</option>
            {projects?.map((project) => (
                <option key={project.id} value={project.id}>{project.name}</option>
            ))}
        </select>
    );
};

export default SelectProject;
