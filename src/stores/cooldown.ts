import { create } from "zustand";

const COOLDOWN = 1; // in minutes

type CooldownState = {
    cooldown: string;
    setStartTime: (isoString: string) => void;
};

export const useCooldownStore = create<CooldownState>((set) => {
    let interval: NodeJS.Timeout;

    return {
        cooldown: "",
        setStartTime: (isoString: string) => {
            clearInterval(interval);
            const target = new Date(
                new Date(isoString).getTime() + COOLDOWN * 60 * 1000
            );

            const update = () => {
                const now = new Date().getTime();
                const diff = Math.max(target.getTime() - now, 0);

                const minutes = Math.floor(diff / 60000);
                const seconds = Math.floor((diff % 60000) / 1000);
                set({
                    cooldown: `${minutes}:${seconds
                        .toString()
                        .padStart(2, "0")}`,
                });

                if (diff === 0) clearInterval(interval);
            };

            update();
            interval = setInterval(update, 1000);
        },
    };
});
