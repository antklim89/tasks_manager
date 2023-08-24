import { TaskProps } from './Task.types';


const Task = ({ task }: TaskProps) => {

    return (
        <div className="card bg-primary shadow-lg">
            <div className="card-body p-2">
                <div className="card-title flex justify-between">
                    {task.title}
                </div>
                <div className="card-body p-1">
                    {task.description}
                </div>
                <div className="card-actions">
                    {task.completeAt}
                </div>
            </div>
        </div>
    );
};

export default Task;
