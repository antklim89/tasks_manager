import { zodResolver } from '@hookform/resolvers/zod';
import { KeyboardEventHandler, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { Input } from '@/components';
import { useColumnUpdate } from '@/requests';
import { columnUpdateSchema } from '@/schemas';


const ColumnName = ({ name, id }: { name: string, id: number }) => {
    const { trigger: updateColumn } = useColumnUpdate({ columnId: id });
    const prevName = useRef(name);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{ name: string }>({
        values: { name },
        resolver: zodResolver(columnUpdateSchema),
    });

    const handleChangeName = handleSubmit((data) => {
        if (data.name === prevName.current) return;
        updateColumn(data).then(() => (prevName.current = data.name));
    });

    const handleKeyDown: KeyboardEventHandler = ({ key, target }) => {
        if (key !== 'Enter') return;
        if (target instanceof HTMLInputElement) target.blur();
    };

    return (
        <Input
            className="border-none bg-transparent focus:bg-white focus:text-black"
            {...register('name')}
            errorMessage={errors.name?.message}
            onBlur={handleChangeName}
            onKeyDown={handleKeyDown}
        />
    );
};

export default ColumnName;
