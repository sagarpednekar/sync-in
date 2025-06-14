"use client";
import { Alarm } from "@/app/hooks/useClock";
import { Dispatch, SetStateAction } from "react";

export type TimezoneLocation = { timezone: string; city: string; country: string };

interface AddAlarmProps {
  onSave: Dispatch<SetStateAction<boolean>>;
  hour: number;
  minutes: number;
  ampm: string;
  ampmlist: Array<{ label: string; value: string }>;
  timeZone: { city: string; country: string; timezone: string };
  timezones: string[];
  alarms: Array<Alarm>;
  setHour: (value: number) => void;
  setMinutes: (value: number) => void;
  setAmPm: (value: string) => void;
  setTimeZone: Dispatch<SetStateAction<{ timezone: string; city: string; country: string; }>>;
  setAlarms: (value: Alarm[]) => void;
  getZonedTime: (timezone: string) => string;
}

export default function AddAlarm({
  onSave,
  hour,
  minutes,
  ampm,
  ampmlist,
  timeZone,
  timezones,
  alarms,
  setHour,
  setMinutes,
  setAmPm,
  setTimeZone,
  setAlarms,
  getZonedTime,
}: AddAlarmProps) {


  const timezoneLocations: TimezoneLocation[] = [
    { timezone: 'Pacific/Auckland', city: 'Auckland', country: 'New Zealand' },
    { timezone: 'Asia/Kolkata', city: 'Mumbai', country: 'India' },
    { timezone: 'America/New_York', city: 'New York', country: 'United States' },
    { timezone: 'Europe/London', city: 'London', country: 'United Kingdom' },
    { timezone: 'Asia/Tokyo', city: 'Tokyo', country: 'Japan' },
    { timezone: 'Australia/Sydney', city: 'Sydney', country: 'Australia' },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form from submitting and refreshing the page
    const newAlarm = {
      id: Date.now(),
      time: `${hour}:${minutes.toString().padStart(2, "0")} ${ampm}`,
      label: "Alarm 1",
      sound: "alarm.mp3",
      timeZone,
      enabled: true,
    };

    setAlarms([...alarms, newAlarm]);
    onSave(false);
  };

  const handleTimezoneChange = (timezoneStr: string) => {
    const timezoneObj = timezoneLocations.find((tz: TimezoneLocation) => tz.timezone === timezoneStr);
    if (timezoneObj) {
      setTimeZone(timezoneObj);
    }
  };

  return (
    <form onSubmit={handleSave}>
      <div>
        <label className="block text-sm font-medium mb-1" htmlFor="hour">
          Select Alarm Time
        </label>
        <div className="flex gap-2 p-2">
          <select
            value={hour}
            onChange={(e) => setHour(Number(e.target.value))}
            className="w-30 p-2 border rounded"
            required
            id="hour"
          >
            {[
              ...Array(12)
                .fill(0)
                .map((_, i) => i + 1),
            ].map((h, i) => (
              <option key={i} value={h}>
                {h}
              </option>
            ))}
          </select>

          <select
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            className="w-30 p-2 border rounded"
            required
          >
            {[
              ...Array(60)
                .fill(0)
                .map((_, i) => i),
            ].map((m, i) => (
              <option key={i} value={m}>
                {m.toString().padStart(2, "0")}
              </option>
            ))}
          </select>

          <select
            value={ampm}
            onChange={(e) => setAmPm(e.target.value)}
            className="w-30 p-2 border rounded"
            required
          >
            {ampmlist.map((format, i) => (
              <option key={i} value={format.value}>
                {format.label}
              </option>
            ))}
          </select>
        </div>

        <div className="p-2 mt-4">
          <label className="block text-sm font-medium mb-1" htmlFor="timezone">
            Select Your Timezone
          </label>
          <select
            value={timeZone.timezone}
            onChange={(e) => handleTimezoneChange(e.target.value)}
            className="w-full p-2 border rounded"
            required
            id="timezone"
          >
            {timezones.map((format, i) => (
              <option key={i} value={format}>
                {format}
              </option>
            ))}
          </select>
        </div>

        {timeZone ? (
          <div>
            <label className=" text-sm font-medium mb-1"> Current Time:</label>{" "}
            {getZonedTime(timeZone.timezone)}
          </div>
        ) : null}

        <div className="m-2">
          <button className="w-full p-2 border-1" type="submit">
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
