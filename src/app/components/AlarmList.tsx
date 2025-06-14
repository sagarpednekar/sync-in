"use client";

import { Alarm } from "@/app/hooks/useClock";
import AlarmItem from "./AlarmItem";


export default function AlarmList({
    alarms,
    getZonedTime,
}: {
    alarms: Alarm[];
    getZonedTime: (timezone: string, timeFormat?: string) => string;
}) {
    return (
        <div>
            <div className="p-2">
                <>
                    {alarms.length ? alarms.map((alarm) => (
                        <AlarmItem key={alarm.id} {...alarm} getZonedTime={getZonedTime}/>
                    ))
                : (<div>No Alarms Added !</div> )
                }
                </>
            </div>
        </div>
    );
}
