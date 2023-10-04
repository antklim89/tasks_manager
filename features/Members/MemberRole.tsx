import { MouseEventHandler } from 'react';

import { Button, Menu } from '@/components';
import { useMember } from '@/hooks';
import { MemberType, roles } from '@/schemas';


const MemberRole = ({ member }: { member: MemberType }) => {
    const { isAdmin, member: userMember } = useMember();
    const isYou = userMember?.id === member.id;
    const currentRole = isYou ? `${member.role} (you)` : member.role;

    if (!isAdmin) return <Button className="font-normal" color="ghost">{currentRole}</Button>;

    const handleSelectRole: MouseEventHandler<HTMLButtonElement> = (e) => {
        console.log(e.currentTarget.name);
        e.currentTarget.blur();
    };

    return (
        <Menu button={<Button outline className="font-normal">{currentRole}</Button>}>
            {roles.map((role) => (
                <Button
                    color="ghost"
                    key={role}
                    name={role}
                    onClick={handleSelectRole}
                >
                    {role}
                </Button>
            ))}
        </Menu>
    );
};

export default MemberRole;
