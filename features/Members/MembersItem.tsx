import { MemberType } from '@/schemas';

import MemberDelete from './MemberDelete';
import MemberRole from './MemberRole';


const MembersItem = ({ member, members }: { member: MemberType, members: MemberType[] }) => {

    return (
        <tr>
            <td className="break-all">
                {member.profile?.firstName} {member.profile?.lastName}
                <br />
                {member.profile?.email}
            </td>
            <td><MemberRole member={member} /></td>
            <td className="text-center"><MemberDelete member={member} members={members} /></td>
        </tr>
    );
};

export default MembersItem;
