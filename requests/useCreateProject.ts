import useSWRMutation from 'swr/mutation';

import { NewProjectType } from '@/features/NewProject/NewProject.schema';
import { clientComponentClient } from '@/utils';

import { CreateProjectKey } from './keys';


export function useCreateProject() {
    return useSWRMutation<void, Error, CreateProjectKey, NewProjectType>(
        ['CREATE_NEW_PROJECT'],

        async (key, { arg: { name } }) => {
            const supabase = clientComponentClient();

            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error('You are not authenticated!');

            const { error } = await supabase.from('projects').insert({ name, owner: session.user.id });

            if (error?.code === '23505') throw new Error(`Project with name "${name}" alerady exists.`);
            if (error) throw new Error('Failed to add new project. Try again later.');
        },

        {
            throwOnError: true,
        },
    );
}
