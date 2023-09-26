import MemberDelete from './MemberDelete';
import { MembersItemProps } from './Members.types';


const MembersItem = ({ member }: MembersItemProps) => {
    return (
        <tr>
            <td>{member.email}</td>
            <td>{member.role}</td>
            <td className="text-center"><MemberDelete member={member} /></td>
        </tr>
    );
};

export default MembersItem;
