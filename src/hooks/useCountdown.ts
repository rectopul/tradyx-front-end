import { useState, useEffect } from "react";

interface CountdownResult {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
    formatted: string;
}

export function useCountdown(targetDate?: string): CountdownResult {
    const [timeLeft, setTimeLeft] = useState<CountdownResult>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: false,
        formatted: "0d 0h 0m 0s",
    });

    useEffect(() => {
        if (!targetDate) {
            return;
        }

        const calculateTimeLeft = () => {
            const difference =
                new Date(targetDate).getTime() - new Date().getTime();

            if (difference <= 0) {
                setTimeLeft({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                    isExpired: true,
                    formatted: "Expirado",
                });
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            let formatted = "";
            if (days > 0) {
                formatted = `${days}d ${hours}h`;
            } else if (hours > 0) {
                formatted = `${hours}h ${minutes}m`;
            } else {
                formatted = `${minutes}m ${seconds}s`;
            }

            setTimeLeft({
                days,
                hours,
                minutes,
                seconds,
                isExpired: false,
                formatted,
            });
        };

        calculateTimeLeft();
        const interval = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return timeLeft;
}
