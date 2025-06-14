import { useEffect, useRef, useState } from "react";
import { CiAlarmOn } from "react-icons/ci";
import { Alarm } from "@/app/hooks/useClock";
import SVGClock from "@/app/components/SVGClock";


type AlarmItemProps = Omit<Alarm, "id"> & {
    getZonedTime: (timezone: string, timeFormat?: string) => string;
    getZonedDate: (timezone: string) => Date
};

export default function AlarmItem({
    timeZone,
    time,
    getZonedTime,

}: AlarmItemProps) {
    const [showSnoozeBtn, setShowSnoozeBtn] = useState(false);
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

               {/*  Audio File element */}
                <audio
                    ref={audioRef}
                    src="/audio/alarm.wav"
                    preload="auto"
                    loop
                />

                {/* Clock Component  */}

                <SVGClock timezone={timeZone.timezone} />
                <div className="text-3xl text-amber-300 font-extrabold">
                    {timeZone.city}
                </div>
                <div className="flex justify-center items-center gap-1 text-xl">
                    <CiAlarmOn /> <span>{alarmTime}</span>
                </div>
                <div className="flex gap-2 justify-center items-center text-xl font-bold">
                    <div>{timeZone.country}</div>
                </div>



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
