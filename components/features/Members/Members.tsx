'use client';
import { useMember } from '@/hooks';
import { useMembersFetch } from '@/request-hooks';

import MemberDelete from './MemberDelete';
import MemberRole from './MemberRole';
import MembersInvite from './MembersInvite';


const Members = () => {
    const { data: members = [] } = useMembersFetch();
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
                    {members.map((member) => (
                        <tr key={member.id}>
                            <td className="break-all">
                                {member.profile?.firstName} {member.profile?.lastName}
                                <br />
                                {member.profile?.email}
                            </td>
                            <td><MemberRole member={member} members={members} /></td>
                            <td className="text-center"><MemberDelete member={member} members={members} /></td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    );
};

export default Members;
