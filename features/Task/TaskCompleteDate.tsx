import { formatDistance } from 'date-fns';
import React from 'react';
import { FaCalendarXmark, FaFlagCheckered } from 'react-icons/fa6';

import { useCurrentDate } from '@/hooks';
import { cn } from '@/utils';


const TWO_HOURS = 3600000 * 2;
const TWO_DAYS = 86400000 * 2;


const TaskCompleteDate = ({ completeAt }: { completeAt?: string | null }) => {
    const currentDate = useCurrentDate();
    if (!completeAt) return null;
    const providedDate = new Date(completeAt).getTime();
    const isOutDatedTime = providedDate < currentDate;
    const isCriticalTime = providedDate > currentDate;
    const isWarningTime = providedDate > currentDate + TWO_HOURS;
    const isNormalTime = providedDate > currentDate + TWO_DAYS;

    let color = 'text-red-500';
    if (isCriticalTime) color = 'text-red-500';
    if (isWarningTime) color = 'text-yellow-500';
    if (isNormalTime) color = 'text-green-500';

    const date = formatDistance(providedDate, currentDate, { addSuffix: false });
    return (
        <div className="flex items-center">
            {isOutDatedTime ? <FaCalendarXmark className={cn('mr-2 text-red-500')} /> : <FaFlagCheckered className={cn('mr-2', color)} />}

            {isOutDatedTime
                ? <p>Outdated {date} ago</p>
                : <p>{date} to complete</p>}
        </div>
    );
};

export default TaskCompleteDate;
