import { zodResolver } from '@hookform/resolvers/zod';
import { KeyboardEventHandler, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { Input } from '@/components';
import { useColumnSelector, useMember } from '@/hooks';
import { useColumnUpdate, useHistoryCreate } from '@/request-hooks';
import { columnUpdateSchema } from '@/schemas';


const ColumnName = () => {
    const columnName = useColumnSelector(column => column.name);
    const { trigger: historyCreate } = useHistoryCreate();
    const { trigger: updateColumn } = useColumnUpdate({ onSuccess(data) {
        historyCreate({ body: `Rename column "${columnName}" to "${data.name}"` });
    } });
    
    const { isAdminOrUser: isAdminOrMember } = useMember();
    const prevName = useRef(columnName);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{ name: string }>({
        values: { name: columnName },
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
            readOnly={!isAdminOrMember}
            {...register('name')}
            errorMessage={errors.name?.message}
            onBlur={handleChangeName}
            onKeyDown={handleKeyDown}
        />
    );
};

export default ColumnName;
