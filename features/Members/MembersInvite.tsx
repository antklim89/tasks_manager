import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button, Input, Modal } from '@/components';
import { SUPABASE_ANON_KEY } from '@/constants';
import { useDisclosure } from '@/hooks';
import { getBrowserUser } from '@/supabase/browser';
import { Database } from '@/supabase/generated-types';


const MembersInvite = ({ projectId }: { projectId: number }) => {
    const { isOpen, close, open } = useDisclosure();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{email: string}>({
        resolver: zodResolver(z.object({ email: z.string().email() })),
    });

    const handleInvite = handleSubmit(async (data) => {
        // TODO: create edge function
        const user = await getBrowserUser();
        await fetch('https://owmyjpfdbksekhxmknmw.supabase.co/rest/v1/members', {
            method: 'POST',
            headers: {
                'apikey': `${SUPABASE_ANON_KEY}`,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal',
            },
            body: JSON.stringify({
                role: 'member',
                projectId,
                userId: user.id,
                email: data.email,
            } satisfies Database['public']['Tables']['members']['Insert']),
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
