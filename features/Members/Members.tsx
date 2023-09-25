'use client';
import { useMembersFetch } from '@/requests';

import { MembersProps } from './Members.types';
import MembersItem from './MembersItem';


const Members = ({ projectId }: MembersProps) => {
    const { data: members = [], isLoading } = useMembersFetch({ projectId });

    if (isLoading) return null;
    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((member) => (
                        <MembersItem key={member.id} member={member} />
                    )) }
                </tbody>
            </table>
        </div>
    );
};

export default Members;
