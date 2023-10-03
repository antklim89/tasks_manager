import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button, Input, Modal } from '@/components';
import { useDisclosure } from '@/hooks';
import { useInvite } from '@/requests';
import { MemberType } from '@/schemas';


const MembersInvite = ({ members }: { members: MemberType[] }) => {
    const { isOpen, close, open } = useDisclosure();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<{email: string}>({
        resolver(values, context, options) {
            if (members.some((m) => m.email === values.email)) {
                return { errors: { email: { type: 'pattern', message: 'The member with this email is already exists.' } }, values: {} };
            }
            return zodResolver(z.object({ email: z.string().email() }))(values, context, options);
        },

    });

    const { trigger: invite, isMutating: isInviting } = useInvite({
        onSuccess() {
            reset({ email: '' }, { keepValues: false });
            close();
        },
    });

    const handleInvite = handleSubmit(async ({ email }) => {
        await invite({ email });
    });

    return (
        <>
            <div className="flex justify-end">
                <Button size="sm" onClick={open}>Invite</Button>
            </div>
            <Modal isOpen={isOpen} size="2xl" onClose={close}>
                <Modal.Title className="text-2xl">
                    Invite a new member
                </Modal.Title>
                <Modal.Body>
                    <form>
                        <Input
                            {...register('email')}
                            autoComplete="username"
                            errorMessage={errors.email?.message}
                            label="Email"
                            placeholder="example@mail.com"
                            type="email"
                        />
                        <Modal.Footer>
                            <Button disabled={isInviting} onClick={handleInvite}>Invite</Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default MembersInvite;
