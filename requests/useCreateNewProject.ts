import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import useSWRMutation from 'swr/mutation';

import { NewProjectType } from '@/features/NewProject/NewProject.schema';
import { Database } from '@/supabase-types-generated';

import { NewProjectKeyKey } from './keys';


export function useCreateNewProject() {
    return useSWRMutation<void, Error, NewProjectKeyKey, NewProjectType>(
        ['CREATE_NEW_PROJECT'],

        async (key, { arg: { name } }) => {
            const supabase = createClientComponentClient<Database>();

            const { data } = await supabase.auth.getUser();
            if (!data.user) throw new Error('You are not authenticated!');

            const { error } = await supabase.from('projects').insert({ name, owner: data.user.id });

            if (error) throw error;
        },

        {
            throwOnError: false,
        },
    );
}
