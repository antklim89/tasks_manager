import { useMember } from '@/hooks';
import { MemberType } from '@/schemas';

import MemberDelete from './MemberDelete';
import MemberRole from './MemberRole';


const MembersItem = ({ member }: { member: MemberType }) => {
    const { isAdmin, member: userMember } = useMember();
    const isYou = userMember?.id === member.id;

    return (
        <tr>
            <td>{member.email}</td>
            <td><MemberRole member={member} /></td>
            { (isAdmin || isYou)
                ? <td className="text-center"><MemberDelete member={member} /></td>
                : null}
        </tr>
    );
};

export default MembersItem;
