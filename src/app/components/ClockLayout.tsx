"use client";
import AlarmList from "@/app/components/AlarmList";
import AddAlarm from "@/app/components/AddAlarm";
import { useState } from "react";
import { useClock } from "@/app/hooks/useClock";
import { useTime } from "../hooks/useTime";

export default function ClockLayout() {
    const [showAlarmForm, setShowAlarmForm] = useState(false);
    const handleAddClick = () => {
        setShowAlarmForm(true);
    };
    const { alarms, ...rest } = useClock();
    const clockState = { alarms, ...rest };
    const { getZonedTime,getZonedDate } = useTime();


    return (
        <div>
            <div className="flex justify-between align-middle p-2">
                <h1 className="p-2 text-2xl font-bold mb-4"> Sync.In</h1>

                <div>
                    <button onClick={handleAddClick} className="text-amber-300 text-3xl">
                        +
                    </button>
                </div>
            </div>

            <div className="container mx-auto p-4">
                {showAlarmForm ? (
                    <>
                        <h1 className="text-2xl font-bold mb-6">Add New Alarm</h1>
                        <AddAlarm
                            onSave={setShowAlarmForm}
                            getZonedTime={getZonedTime}
                            {...clockState}
                        />
                    </>
                ) : (
                    <AlarmList alarms={alarms} getZonedTime={getZonedTime} getZonedDate={getZonedDate}/>
                )}
            </div>
        </div>
    );
}
