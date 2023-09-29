import { FaX } from 'react-icons/fa6';

import { Button, Confirm } from '@/components';
import { useDisclosure } from '@/hooks';
import { useMemberDelete } from '@/requests';
import { MemberType } from '@/schemas';


const MemberDelete = ({ member }: { member: MemberType }) => {
    const { trigger: deleteMember, isMutating } = useMemberDelete({ memberId: member.id });
    const { isOpen, close, open } = useDisclosure();

    return (
        <>
            <Confirm
                isLoading={isMutating}
                isOpen={isOpen}
                text="Are you sure you want to remove member."
                onClose={close}
                onConfirm={deleteMember}
            />
            <Button
                aria-label="remove nenber"
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
