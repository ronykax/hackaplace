import { useEffect, useState } from "react";

type CooldownProps = {
    startTime: string; // iso string
};

export default function Cooldown({ startTime }: CooldownProps) {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const end = new Date(new Date(startTime).getTime() + 10 * 60 * 1000); // +10 mins

        const interval = setInterval(() => {
            const now = new Date();
            const diff = end.getTime() - now.getTime();

            if (diff <= 0) {
                setTimeLeft("Ready");
                clearInterval(interval);
                return;
            }

            const mins = Math.floor(diff / 60000);
            const secs = Math.floor((diff % 60000) / 1000);
            setTimeLeft(`${mins}m ${secs}s`);
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime]);

    return <span>{timeLeft}</span>;
}
