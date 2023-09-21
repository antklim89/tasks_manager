import { useState, useEffect } from 'react';


export function useCurrentDate({ isDisabled = false }: { isDisabled?: boolean } = {}) {
    const [currentDate, setCurrentDate] = useState(() => new Date().getTime());

    useEffect(() => {
        if (isDisabled) return undefined;
        const listener = () => setCurrentDate(new Date().getTime());
        const id = setInterval(listener, 60000);
        return () => clearInterval(id);
    }, []);

    return currentDate;
}
