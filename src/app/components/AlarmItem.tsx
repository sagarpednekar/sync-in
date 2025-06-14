import { CiAlarmOn } from "react-icons/ci";
import { Alarm } from "../hooks/useClock";
import { useEffect, useRef, useState } from "react";

type AlarmItemProps = Omit<Alarm, "id"> & {
    getZonedTime: (timezone: string, timeFormat?: string) => string;
};



export default function AlarmItem({
    timeZone,
    time,
    getZonedTime,

}: AlarmItemProps) {
    const [showSnoozeBtn, setShowSnoozeBtn] = useState(false)

    const currentTime = getZonedTime(timeZone.timezone, 'H:mm a');
    const alarmTime = time.toLocaleUpperCase()
    const audioRef = useRef<HTMLAudioElement>(null)
    const toggleLoop = () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                audioRef.current.play().catch(e => console.error("Playback failed:", e));
            } else {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        }
    };

    useEffect(() => {
        if (currentTime === alarmTime) {
            setShowSnoozeBtn(true)
            toggleLoop()

        }
    }, [currentTime, alarmTime])
    return (
        <div>
            <div className="flex flex-col items-center gap-2  border-gray-600 border-y-1 p-4">
                <audio
                    ref={audioRef}
                    src="/audio/alarm.wav"
                    preload="auto"
                    loop
                />
                <div className="text-2xl font-bold">
                    {getZonedTime(timeZone.timezone)}
                </div>
                <div className="flex justify-center items-center gap-1">
                    <CiAlarmOn /> <span>{alarmTime}</span>
                </div>

                <div>{timeZone.timezone}</div>
                {showSnoozeBtn ? <button
                    onClick={() => {
                        if (audioRef.current) {
                            audioRef.current.pause();
                            audioRef.current.currentTime = 0;
                        }
                        setShowSnoozeBtn((prev) => !prev)
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Stop Alarm
                </button> : null}
            </div>
        </div>
    );
}
