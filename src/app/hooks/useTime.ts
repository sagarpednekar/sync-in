import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { useEffect, useState } from "react";

export function useTime() {
    const [currentTime, setCurrentTime] = useState(new Date());


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const getZonedTime = (timezone: string, timeFormat = 'HH:mm:ss a') => {
        return format(toZonedTime(currentTime, timezone), timeFormat)
    }

    const getZonedDate = (timezone: string) => {
        return toZonedTime(currentTime, timezone)
    }



    return {
        // data
        currentTime,
        // methods
        getZonedTime,
        getZonedDate
    }
}