'use client';
import { useMember } from '@/hooks';
import { useMembersFetch } from '@/requests';

import MemberDelete from './MemberDelete';
import MemberRole from './MemberRole';
import MembersInvite from './MembersInvite';


const Members = () => {
    const { data: members = [], isLoading } = useMembersFetch();
    const { isAdmin } = useMember();


    return (
        <div className="card container p-2 border border-base-200 max-w-3xl mx-auto">
            <div className="card-title justify-center">
                <h3>Members</h3>
            </div>
            {isAdmin ? <MembersInvite members={members} /> : null}
            <table className="table table-xs sm:table-md">
                <thead>
                    <tr>
                        <th>Email</th>
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
                            <tr key={member.id}>
                                <td className="break-all">
                                    {member.profile?.firstName} {member.profile?.lastName}
                                    <br />
                                    {member.profile?.email}
                                </td>
                                <td><MemberRole member={member} /></td>
                                <td className="text-center"><MemberDelete member={member} members={members} /></td>
                            </tr>
                        )) }
                </tbody>
            </table>
        </div>
    );
};

export default Members;
