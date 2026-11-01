import { useState, useEffect } from 'react';
import type { ClockItem } from '../types/clock';

interface WorldClockProps {
    clock: ClockItem;
    onDelete: (id: string) => void;
}

export const WorldClock = ({ clock, onDelete }: WorldClockProps) => {
    const [time, setTime] = useState<Date>(() => getCityTime(clock.timezone));

    function getCityTime(timezoneOffset: number): Date {
        const now = new Date();
        const utc = now.getTime() + now.getTimezoneOffset() * 60000;
        return new Date(utc + timezoneOffset * 3600000);
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(getCityTime(clock.timezone));
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [clock.timezone]);

    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours();

    const secondDeg = (seconds / 60) * 360;
    const minuteDeg = ((minutes + seconds / 60) / 60) * 360;
    const hourDeg = (((hours % 12) + minutes / 60) / 12) * 360;

    return (
        <div className="clock-item">
            <button className="delete-btn" onClick={() => onDelete(clock.id)} aria-label="Удалить">
                ✕
            </button>
            <div className="clock-title">{clock.name}</div>

            <div className="clock-face">
                <div
                    className="hand hour-hand"
                    style={{ transform: `rotate(${hourDeg}deg)` }}
                />
                <div
                    className="hand minute-hand"
                    style={{ transform: `rotate(${minuteDeg}deg)` }}
                />
                <div
                    className="hand second-hand"
                    style={{ transform: `rotate(${secondDeg}deg)` }}
                />
                <div className="center-dot" />
            </div>

            <div className="digital-time">
                {time.toLocaleTimeString('ru-RU', { hour12: false })}
            </div>
        </div>
    );
};