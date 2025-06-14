"use client";

import { Alarm } from "@/app/hooks/useClock";
import AlarmItem from "./AlarmItem";


export default function AlarmList({
    alarms,
    getZonedTime,
    getZonedDate
}: {
    alarms: Alarm[];
    getZonedTime: (timezone: string, timeFormat?: string) => string;
    getZonedDate: (timezone: string) => Date
}) {
    return (
        <div>
            <div className="p-2">
                <>
                    {alarms.length ? alarms.map((alarm) => (
                        <AlarmItem key={alarm.id} {...alarm} getZonedTime={getZonedTime} getZonedDate={getZonedDate}/>
                    ))
                : (<div>No Alarms Added !</div> )
                }
                </>
            </div>
        </div>
    );
}
