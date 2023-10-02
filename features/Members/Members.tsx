'use client';
import { useMember } from '@/hooks';
import { useMembersFetch } from '@/requests';

import MembersInvite from './MembersInvite';
import MembersItem from './MembersItem';


const Members = () => {
    const { data: members = [], isLoading } = useMembersFetch();
    const { isAdmin } = useMember();


    return (
        <div className="card container p-2 border border-base-200 max-w-3xl mx-auto">
            <div className="card-title justify-center">
                <h3>Members</h3>
            </div>
            {isAdmin ? <MembersInvite members={members} /> : null}
            <div className="card-body">
                <table className="table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Role</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading
                            ? [1, 2, 3].map((i) => (
                                <tr key={i}>
                                    <td className="skeleton h-10 w-6 mb-1" />
                                    <td className="skeleton h-10 w-6 mb-1" />
                                    <td className="skeleton h-10 w-6 mb-1" />
                                </tr>
                            ))
                            : members.map((member) => (
                                <MembersItem key={member.id} member={member} />
                            )) }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Members;
