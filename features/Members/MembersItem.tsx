import { MemberType } from '@/schemas';

import MemberDelete from './MemberDelete';


const MembersItem = ({ member }: { member: MemberType }) => {
    return (
        <tr>
            <td>{member.email}</td>
            <td>{member.role}</td>
            <td className="text-center"><MemberDelete member={member} /></td>
        </tr>
    );
};

export default MembersItem;
