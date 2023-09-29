'use client';
import { useMembersFetch } from '@/requests';

import MembersInvite from './MembersInvite';
import MembersItem from './MembersItem';


const Members = () => {
    const { data: members = [], isLoading } = useMembersFetch();

    if (isLoading) return (
        <>
            <span className="skeleton h-10 mb-1" />
            <span className="skeleton h-10 mb-1" />
        </>
    );
    return (
        <div className="card container p-2 border border-base-200 max-w-3xl mx-auto ">
            <div className="card-title justify-center">
                <h3>Members</h3>
            </div>
            <MembersInvite />
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
                        {members.map((member) => (
                            <MembersItem key={member.id} member={member} />
                        )) }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Members;
