'use client';
import { ColumnType } from '@/schemas';

import ColumnDelete from './ColumnDelete';
import ColumnName from './ColumnName';
import ColumnTaskCreate from './ColumnTaskCreate';


const Column = ({ id, name, project }: ColumnType) => {
    return (
        <div className="card w-96 bg-base-200 shadow-xl">
            <div className="card-body p-2">
                <div className="card-title flex justify-between">
                    <ColumnName id={id} name={name} projectId={project} />
                    <ColumnDelete id={id} projectId={project} />
                </div>
                <div className="card-actions">
                    <ColumnTaskCreate columnId={id} />
                </div>
            </div>
        </div>
    );
};

export default Column;
