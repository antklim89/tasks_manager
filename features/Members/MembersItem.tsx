import { MembersItemProps } from './Members.types';


const MembersItem = ({ member }: MembersItemProps) => {
    return (
        <tr>
            <td>{member.email}</td>
            <td>{member.role}</td>
        </tr>
    );
};

export default MembersItem;
