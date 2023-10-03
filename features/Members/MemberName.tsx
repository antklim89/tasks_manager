import { zodResolver } from '@hookform/resolvers/zod';
import { KeyboardEventHandler, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { Input } from '@/components';
import { useMember } from '@/hooks';
import { useMemberUpdate } from '@/requests';
import { MemberType, memberUpdateSchema } from '@/schemas';
import { cn } from '@/utils';


const MemberName = ({ member }: { member: MemberType }) => {
    const { trigger: updateMember } = useMemberUpdate({ memberId: member.id });
    const { isAdmin, member: userMember } = useMember();
    const isYou = userMember?.id === member.id;

    const prevName = useRef(member.name);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{ name: string }>({
        values: { name: member.name },
        resolver: zodResolver(memberUpdateSchema),
    });

    const handleChangeName = handleSubmit((data) => {
        if (data.name === prevName.current) return;
        updateMember(data).then(() => (prevName.current = data.name));
    });

    const handleKeyDown: KeyboardEventHandler = ({ key, target }) => {
        if (key !== 'Enter') return;
        if (target instanceof HTMLInputElement) target.blur();
    };

    return (
        <Input
            className={cn('border-none text-sm bg-transparent', { 'focus:bg-white focus:text-black': isAdmin || isYou })}
            readOnly={!isAdmin && !isYou}
            {...register('name')}
            errorMessage={errors.name?.message}
            onBlur={handleChangeName}
            onKeyDown={handleKeyDown}
        />
    );
};

export default MemberName;
