// components/SVGClock.tsx
"use client";
import { useEffect, useState } from 'react';
import { toZonedTime } from 'date-fns-tz';

export default function SVGClock({ timezone }: { timezone: string }) {

    const [time, setTime] = useState(toZonedTime(new Date(), timezone));



    useEffect(() => {
        const timer = setInterval(() => setTime(toZonedTime(new Date(), timezone)), 1000);
        return () => clearInterval(timer);
    },[]);

    // Calculate rotation angles
    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours() % 12;

    const secondDegrees = seconds * 6; // 360/60 = 6 degrees per second
    const minuteDegrees = minutes * 6 + seconds * 0.1; // Add slight movement from seconds
    const hourDegrees = hours * 30 + minutes * 0.5; // 360/12 = 30 degrees per hour

    return (
        <div className="flex justify-center">
            <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-lg">
                {/* Clock face */}
                <circle cx="100" cy="100" r="95" fill="white" stroke="#333" strokeWidth="4" />

                {/* Hour marks */}
                {Array.from({ length: 12 }).map((_, i) => (
                    <line
                        key={i}
                        x1="100" y1="20"
                        x2="100" y2="30"
                        stroke="#333"
                        strokeWidth="3"
                        transform={`rotate(${i * 30} 100 100)`}
                    />
                ))}

                {/* Minute marks */}
                {Array.from({ length: 60 }).map((_, i) => (
                    <line
                        key={i}
                        x1="100" y1="10"
                        x2="100" y2="15"
                        stroke="#666"
                        strokeWidth="1"
                        transform={`rotate(${i * 6} 100 100)`}
                        opacity={i % 5 ? 1 : 0} // Skip positions where hour marks exist
                    />
                ))}

                {/* Clock hands */}
                <line
                    x1="100" y1="100"
                    x2="100" y2="60"
                    stroke="#333"
                    strokeWidth="6"
                    strokeLinecap="round"
                    transform={`rotate(${hourDegrees} 100 100)`}
                />
                <line
                    x1="100" y1="100"
                    x2="100" y2="40"
                    stroke="#666"
                    strokeWidth="4"
                    strokeLinecap="round"
                    transform={`rotate(${minuteDegrees} 100 100)`}
                />
                <line
                    x1="100" y1="100"
                    x2="100" y2="30"
                    stroke="red"
                    strokeWidth="2"
                    strokeLinecap="round"
                    transform={`rotate(${secondDegrees} 100 100)`}
                />

                {/* Center dot */}
                <circle cx="100" cy="100" r="5" fill="#333" />
            </svg>
        </div>
    );
}