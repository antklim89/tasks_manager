import { FaX } from 'react-icons/fa6';

import { Button } from '@/components';

import { MembersItemProps } from './Members.types';


const MembersItem = ({ member }: MembersItemProps) => {
    return (
        <tr>
            <td>{member.email}</td>
            <td>{member.role}</td>
            <td className="text-center"><Button aria-label="remove nenber" color="error" size="xs"><FaX /></Button></td>
        </tr>
    );
};

export default MembersItem;
