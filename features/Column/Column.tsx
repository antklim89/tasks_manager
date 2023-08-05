'use client';
import { ColumnType } from '@/schemas';

import ColumnDelete from './ColumnDelete';


const Column = ({ id, name, project }: ColumnType) => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body p-2">
                <div className="card-title flex justify-between">
                    <h2>{name}</h2>
                    <ColumnDelete id={id} projectId={project} />
                </div>
            </div>
        </div>
    );
};

export default Column;
