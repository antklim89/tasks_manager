import { formatDistance } from 'date-fns';
import { FaPause, FaPlay } from 'react-icons/fa6';

import { useCurrentDate } from '@/hooks';


const TaskStartDate = ({ startAt }: { startAt?: string | null }) => {
    const currentDate = useCurrentDate();

    if (!startAt) return null;
    const providedDate = new Date(startAt).getTime();


    const isStart = providedDate > currentDate;
    const date = formatDistance(providedDate, currentDate, { addSuffix: false });

    return (
        <div className="flex items-center">
            {isStart ? <FaPause className="text-green-500 mr-2" /> : <FaPlay className="text-green-500 mr-2" />}
            {isStart ? <p>Start in {date}</p> : <p>Started {date} ago</p>}
        </div>
    );
};

export default TaskStartDate;
