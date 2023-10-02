import { useMember } from '@/hooks';
import { MemberType } from '@/schemas';

import MemberDelete from './MemberDelete';


const MembersItem = ({ member }: { member: MemberType }) => {
    const { isAdmin, member: userMember } = useMember();
    const isYou = userMember?.id === member.id;
    return (
        <tr>
            <td>{member.email}</td>
            <td>{isYou ? `${member.role} (you)` : member.role}</td>
            { (isAdmin || isYou)
                ? <td className="text-center"><MemberDelete member={member} /></td>
                : null}
        </tr>
    );
};

export default MembersItem;
