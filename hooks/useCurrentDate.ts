import { useState, useEffect } from 'react';


export function useCurrentDate() {
    const [currentDate, setCurrentDate] = useState(() => new Date().getTime());

    useEffect(() => {
        const listener = () => setCurrentDate(new Date().getTime());
        const id = setInterval(listener, 60000);
        return () => clearInterval(id);
    }, []);

    return currentDate;
}
