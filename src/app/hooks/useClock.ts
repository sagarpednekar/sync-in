import { useState } from "react";

export type Alarm = {
  id: number;
  time: string;
  label: string;
  sound: string;
  timeZone:  {city: string,country: string,timezone: string};
  enabled: boolean;
};

export function useClock() {
  const [alarms, setAlarms] = useState<Alarm[]>([

  ]);

  const [hour, setHour] = useState(7);
  const [minutes, setMinutes] = useState(0);
  const [ampm, setAmPm] = useState("am");
  const ampmlist = [
    {
      label: "AM",
      value: "am",
    },
    {
      label: "PM",
      value: "pm",
    },
  ];


  const timezones = [
    "Pacific/Auckland",
    "Asia/Kolkata",
    "America/New_York",
    "Europe/London",
    "Asia/Tokyo",
    "Australia/Sydney",
  ];

   const timezoneLocations = [
    {
      timezone: 'Pacific/Auckland',
      city: 'Auckland',
      country: 'New Zealand'
    },
    {
      timezone: 'Asia/Kolkata',
      city: 'Mumbai',
      country: 'India'
    },
    {
      timezone: 'America/New_York',
      city: 'New York',
      country: 'United States'
    },
    {
      timezone: 'Europe/London',
      city: 'London',
      country: 'United Kingdom'
    },
    {
      timezone: 'Asia/Tokyo',
      city: 'Tokyo',
      country: 'Japan'
    },
    {
      timezone: 'Australia/Sydney',
      city: 'Sydney',
      country: 'Australia'
    },
    // Add more timezones as needed
  ];

  const [timeZone, setTimeZone] = useState(timezoneLocations[0]);


  const value = {
    // data
    alarms,
    hour,
    minutes,
    ampm,
    ampmlist,
    timeZone,
    timezones: timezones,
    // methods
    setAlarms,
    setHour,
    setMinutes,
    setAmPm,
    setTimeZone,
  };

  return value;
}
