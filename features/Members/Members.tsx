'use client';
import { useMembersFetch } from '@/requests';

import { MembersProps } from './Members.types';


const Members = ({ projectId }: MembersProps) => {
    const { data: members = [], isLoading } = useMembersFetch({ projectId });

    if (isLoading) return null;
    return (
        <div>
            {members.map((member) => member.email) }
        </div>
    );
};

export default Members;
