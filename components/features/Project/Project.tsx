'use client';
import { useEffect, useState } from 'react';

import { Column, TaskDndContext } from '@/components';
import { ColumnContext } from '@/hooks';
import { useColumnsFetch } from '@/request-hooks';
import { cn } from '@/utils';

import ProjectCreateColumn from './ProjectCreateColumn';


const Project = () => {
    const { data: columns = [] } = useColumnsFetch();
    const [ref, setRef] = useState<HTMLDivElement|null>(null);
    const [isWidthOverflow, setIsWidthOverflow] = useState(false);
    const [isHeightOverflow, setIsHeightOverflow] = useState(false);

    useEffect(() => {
        if (!ref) return () => null;
        const listener = () => {
            setIsWidthOverflow(ref.scrollWidth > document.body.clientWidth);
            setIsHeightOverflow(ref.scrollHeight > document.body.clientHeight);
        };
        listener();
        window.addEventListener('resize', listener);
        return () => window.removeEventListener('resize', listener);
    }, [ref]);

    return (
        <TaskDndContext>
            <div
                className={cn('flex flex-grow items-start gap-2', { 'overflow-x-scroll': isWidthOverflow, 'overflow-y-scroll': isHeightOverflow })} 
                ref={setRef}
            >
                {columns.map((column) => (
                    <ColumnContext.Provider key={column.id} value={column}>
                        <Column />
                    </ColumnContext.Provider>
                ))}
                <ProjectCreateColumn />
            </div>
        </TaskDndContext>
    );
};

export default Project;
