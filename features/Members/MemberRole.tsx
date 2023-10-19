import { Fragment, MouseEventHandler } from 'react';

import { Button, Confirm, Menu } from '@/components';
import { useDisclosure, useMember } from '@/hooks';
import { useMemberUpdate } from '@/requests';
import { MemberType, MemberUpdateType, updateRoles } from '@/schemas';


const MemberRole = ({ member, members }: { member: MemberType, members: MemberType[] }) => {
    const { isOpen, close, open } = useDisclosure();
    const { trigger: updateMember, isMutating } = useMemberUpdate({ memberId: member.id });
    const { isAdmin, member: userMember } = useMember();
    const isYou = userMember?.id === member.id;
    const canUpdate = member.role !== 'admin' || members.filter((m) => m.role === 'admin').length > 1;

    const handleSelectRole: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.currentTarget.blur();
        const role = e.currentTarget.name;
        if (updateRoles.includes(role)) updateMember({ role: role as MemberUpdateType['role'] });
    };

    return (
        <Menu
            button={(
                <Button
                    outline
                    className="font-normal btn-xs sm:btn-sm"
                    disabled={!canUpdate || !isAdmin}
                    isLoading={isMutating}
                >
                    {isYou ? `${member.role} (you)` : member.role}
                </Button>
            )}
        >
            {updateRoles
                .filter((role) => role !== member.role)
                .map((role) => (
                    <Fragment key={role}>
                        <Confirm
                            isLoading={isMutating}
                            isOpen={isOpen}
                            name={role}
                            text="Are you sure you want to change your role. You can't change it back."
                            onClose={close}
                            onConfirm={handleSelectRole}
                        />
                        <Button
                            className="btn-xs sm:btn-sm"
                            color="ghost"
                            isLoading={isMutating}
                            name={role}
                            onClick={((userMember?.id === member.id) && (member.role === 'admin')) ? open : handleSelectRole}
                        >
                            {role}
                        </Button>
                    </Fragment>
                ))}
        </Menu>
    );
};

export default MemberRole;
