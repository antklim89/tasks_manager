import { FaX } from 'react-icons/fa6';

import { Button, Confirm } from '@/components';
import { useDisclosure, useMember } from '@/hooks';
import { useHistoryCreate, useMemberDelete } from '@/request-hooks';
import { MemberType } from '@/schemas';


const MemberDelete = ({ member, members }: { member: MemberType, members: MemberType[] }) => {
    const { trigger: historyCreate } = useHistoryCreate();
    const { trigger: deleteMember, isMutating } = useMemberDelete({ memberId: member.id }, {
        onSuccess() {
            historyCreate({ body: `Member "${member.profile.email}" removed` });
        },
    });
    const { isOpen, close, open } = useDisclosure();
    const { isAdmin, member: userMember } = useMember();
    const isYou = userMember?.id === member.id;
    const canDelete = member.role !== 'admin' || members.filter((m) => m.role === 'admin').length > 1;


    if (!canDelete) return null;
    if (!isAdmin && !isYou) return null;
    return (
        <>
            <Confirm
                isLoading={isMutating}
                isOpen={isOpen}
                text="Are you sure you want to remove member."
                onClose={close}
                onConfirm={() => deleteMember()}
            />
            <Button
                aria-label="remove member"
                color="error"
                isLoading={isMutating}
                size="xs"
                onClick={open}
            >
                <FaX />
            </Button>
        </>
    );
};

export default MemberDelete;
