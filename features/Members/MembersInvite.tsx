import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button, Input, Modal } from '@/components';
import { useDisclosure, useProject } from '@/hooks';
import { MemberType } from '@/schemas';
import { getBrowserClient } from '@/supabase/browser';


const MembersInvite = ({ members }: { members: MemberType[] }) => {
    const { projectId } = useProject();
    const { isOpen, close, open } = useDisclosure();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{email: string}>({
        resolver(values, context, options) {
            if (members.some((m) => m.email === values.email)) {
                return { errors: { email: { type: 'pattern', message: 'The member with this email is already exists.' } }, values: {} };
            }

            return zodResolver(z.object({ email: z.string().email() }))(values, context, options);
        },

    });

    const handleInvite = handleSubmit(async ({ email }) => {
        // TODO: should be sent invitation fo member
        await getBrowserClient().functions.invoke('invite', {
            body: { email, projectId },
        });
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
                            <Button onClick={handleInvite}>Invite</Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default MembersInvite;
